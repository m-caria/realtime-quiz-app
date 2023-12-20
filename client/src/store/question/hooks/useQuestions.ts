import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getCurrentQuestion,
	getQuestionById,
	getQuestionIds,
	getQuestionState,
} from '../selectors';
import {
	OnAnswerMessage,
	OnQuestionCreatedMessage,
	OnTimerStoppedMessage,
	OnTimerUpdateMessage,
	OnAcceptOrRejectAnswerMessage,
	OnTimerExpiredMessage,
} from '../../../types';
import {
	onAnswer,
	onEnterRoom,
	onQuestionCreated,
	onTimerStopped,
	onTimerUpdated,
	onAcceptOrRejectAnswer,
	onTimerExpired,
} from '../reducers/rootSlice';

export const useQuestions = (roomId: string) => {
	const dispatch = useAppDispatch();
	const questions = useAppSelector(getQuestionState);
	const questionsById = useAppSelector(getQuestionById(roomId));
	const questionsIds = useAppSelector(getQuestionIds(roomId));
	const currentQuestion = useAppSelector(getCurrentQuestion(roomId));

	const onEnterInRoom = useCallback(
		(roomId: string) => dispatch(onEnterRoom(roomId)),
		[dispatch]
	);

	const onCreatedQuestion = useCallback(
		(payload: OnQuestionCreatedMessage) => {
			dispatch(onQuestionCreated(payload));
		},
		[dispatch]
	);

	const onCreatedAnswer = useCallback(
		(payload: OnAnswerMessage) => {
			dispatch(onAnswer(payload));
		},
		[dispatch]
	);

	const onUpdateTimer = useCallback(
		(payload: OnTimerUpdateMessage) => {
			dispatch(onTimerUpdated(payload));
		},
		[dispatch]
	);

	const onStopTimer = useCallback(
		(payload: OnTimerStoppedMessage) => {
			dispatch(onTimerStopped(payload));
		},
		[dispatch]
	);

	const onSetAcceptedOrRejectedAnswer = useCallback(
		(payload: OnAcceptOrRejectAnswerMessage) => {
			dispatch(onAcceptOrRejectAnswer(payload));
		},
		[dispatch]
	);

	const onExpiredTimer = useCallback(
		(payload: OnTimerExpiredMessage) => {
			dispatch(onTimerExpired(payload));
		},
		[dispatch]
	);

	return {
		questions,
		questionsById,
		questionsIds,
		currentQuestion,
		onCreatedQuestion,
		onCreatedAnswer,
		onEnterInRoom,
		onUpdateTimer,
		onStopTimer,
		onExpiredTimer,
		onSetAcceptedOrRejectedAnswer,
	};
};
