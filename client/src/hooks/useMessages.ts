import { useCallback, useEffect, useState } from 'react';
import { useQuestions, useQuizRoom } from '../store';
import { SignalRContext } from '../contexts';
import {
	OnAcceptOrRejectAnswerMessage,
	OnAddPlayerScoreMessage,
	OnQuestionCreatedMessage,
	OnTryToAnswerMessage,
} from '../types';

export const useMessages = (roomId: string) => {
	const [answer, setAnswer] = useState('');
	const [question, setQuestion] = useState('');
	const [isOwnerTyping, setIsOwnerTyping] = useState(false);
	const [isOwnerThinking, setIsOwnerThinking] = useState(false);
	const [isTimerExpiredModalOpened, setIsTimerExpiredModalOpened] =
		useState(false);

	const {
		questionsIds,
		questionsById,
		currentQuestion,
		onCreatedQuestion,
		onCreatedAnswer,
		onEnterInRoom,
		onUpdateTimer,
		onStopTimer,
		onExpiredTimer,
		onSetAcceptedOrRejectedAnswer,
	} = useQuestions(roomId);

	const { quizRoomByIds, addPointToPlayer, onAddScorePointToPlayer } =
		useQuizRoom();

	useEffect(() => {
		onEnterInRoom(roomId);
	}, [onEnterInRoom, roomId]);

	SignalRContext.useSignalREffect(
		'OnStartTypingQuestion',
		() => {
			setIsOwnerTyping(true);
		},
		[]
	);

	SignalRContext.useSignalREffect(
		'OnEndTypingQuestion',
		() => setIsOwnerTyping(false),
		[]
	);

	SignalRContext.useSignalREffect(
		'OnQuestionCreated',
		(data: OnQuestionCreatedMessage) => {
			onCreatedQuestion(data);
		},
		[]
	);

	SignalRContext.useSignalREffect(
		'OnTimerElapsed',
		(seconds: number, roomId: string, questionId: string) => {
			onUpdateTimer({ questionId, roomId, seconds });
		},
		[]
	);

	SignalRContext.useSignalREffect(
		'OnTimerExpired',
		(roomId: string, questionId: string) => {
			onExpiredTimer({ roomId, questionId });
			setIsTimerExpiredModalOpened(true);
		},
		[]
	);

	SignalRContext.useSignalREffect(
		'OnTimerStopped',
		(roomId: string, questionId: string) => {
			onStopTimer({ questionId, roomId });
		},
		[]
	);

	SignalRContext.useSignalREffect(
		'OnAddedPlayerScore',
		(message: OnAddPlayerScoreMessage) => {
			onAddScorePointToPlayer(message);
		},
		[]
	);

	SignalRContext.useSignalREffect(
		'OnValidAnswer',
		(message: OnAcceptOrRejectAnswerMessage) => {
			onSetAcceptedOrRejectedAnswer(message);
			setIsOwnerThinking(false);
		},
		[]
	);

	const sendAnswer = useCallback(
		(username: string, questionId: string) => {
			if (answer) {
				const message: OnTryToAnswerMessage = {
					answer,
					playerName: username,
					questionId,
					roomId,
				};
				SignalRContext.invoke('TryToAnswer', message);
				setAnswer('');
				setIsOwnerThinking(true);
			}
		},
		[answer, roomId]
	);

	const onOwnerTyping = useCallback(
		(isTyping: boolean) => {
			SignalRContext.invoke('OnOwnerTypingQuestion', roomId, isTyping);
		},
		[roomId]
	);

	const onPublishQuestion = useCallback(() => {
		if (question) {
			SignalRContext.invoke('CreateQuestion', roomId, question);
			setIsOwnerTyping(false);
			setQuestion('');
		}
	}, [question, roomId]);

	const onAcceptAnswer = useCallback(() => {
		if (currentQuestion) {
			const lastAnswer = Object.values(
				questionsById[currentQuestion].answers.byId
			).reverse()[0];
			const player = quizRoomByIds[roomId].players.find(
				(player) => player.username === lastAnswer.playerName
			);

			addPointToPlayer({ roomId, playerId: player?.id ?? '' });
			SignalRContext.invoke('OnAcceptOrRejectAnswer', {
				roomId,
				questionId: currentQuestion,
				answerId: lastAnswer.id,
				isAccepted: true,
			} as OnAcceptOrRejectAnswerMessage);
		}
	}, [addPointToPlayer, currentQuestion, questionsById, quizRoomByIds, roomId]);

	const onRejectAnswer = useCallback(() => {
		const lastAnswer = Object.values(
			questionsById[currentQuestion].answers.byId
		).reverse()[0];
		SignalRContext.invoke('OnAcceptOrRejectAnswer', {
			roomId,
			questionId: currentQuestion,
			answerId: lastAnswer.id,
			isAccepted: false,
		} as OnAcceptOrRejectAnswerMessage);
		SignalRContext.invoke('RestartTimer', roomId, currentQuestion, 10);
	}, [currentQuestion, questionsById, roomId]);

	return {
		question,
		isOwnerTyping,
		questionsById,
		questionsIds,
		currentQuestion,
		isOwnerThinking,
		answer,
		isTimerExpiredModalOpened,
		sendAnswer,
		onOwnerTyping,
		onPublishQuestion,
		onCreatedAnswer,
		setAnswer,
		setQuestion,
		onAcceptAnswer,
		onRejectAnswer,
		setIsOwnerThinking,
		setIsTimerExpiredModalOpened,
	};
};
