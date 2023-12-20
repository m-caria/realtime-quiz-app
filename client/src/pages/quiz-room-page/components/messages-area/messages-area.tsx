import { useCallback, useContext } from 'react';
import { Button, Typography } from '../../../../components';
import { QuizRoomMessageContext, SignalRContext } from '../../../../contexts';
import { useApplicationUser } from '../../../../store';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { OnAnswerMessage } from '../../../../types';
import { NotificationModal } from '..';

type Props = {
	owner: string;
	roomId: string;
	bookAnswerUser?: string;
	onBookAnswer: (username: string) => void;
	isOwnerThinking: boolean;
};

const MessagesArea: React.FC<Props> = ({
	owner,
	roomId,
	bookAnswerUser,
	onBookAnswer,
	isOwnerThinking,
}) => {
	const {
		applicationUser: {
			data: { username },
		},
	} = useApplicationUser();
	const {
		currentQuestion,
		isOwnerTyping,
		onCreatedAnswer,
		questionsById,
		questionsIds,
		onAcceptAnswer,
		onRejectAnswer,
		isTimerExpiredModalOpened,
		setIsTimerExpiredModalOpened,
	} = useContext(QuizRoomMessageContext);

	SignalRContext.useSignalREffect(
		'OnBookAnswer',
		(playerName: string) => onBookAnswer(playerName),
		[]
	);

	SignalRContext.useSignalREffect(
		'OnAnswer',
		(payload: OnAnswerMessage) => {
			onCreatedAnswer && onCreatedAnswer(payload);
			onBookAnswer('');
		},
		[]
	);

	const bookAnswer = useCallback(() => {
		SignalRContext.invoke('BookAnswer', roomId, username);
		SignalRContext.invoke('StopTimer', roomId, currentQuestion);
		onBookAnswer(username ?? '');
	}, [currentQuestion, onBookAnswer, roomId, username]);

	const getAnswerBgColor = useCallback(
		(isAccepted: boolean, isRejected: boolean) => {
			if (isAccepted) return 'bg-green-300 text-white';
			if (isRejected) return 'bg-red-300 text-white';
			return 'bg-stone-200';
		},
		[]
	);

	return (
		<div className="col-start-3 col-end-13 row-start-2 row-end-6 w-full grid items-end mr-4 overflow-y-auto">
			<ul className="grid gap-2">
				{questionsIds.map((id, idx) => (
					<li
						key={id}
						className="p-4 rounded-2xl w-full justify-self-center flex gap-2 flex-col border-2 border-primary"
					>
						<div
							key={`${id}--${idx}`}
							className="p-4 rounded-2xl justify-self-start flex gap-2 flex-col bg-primary"
						>
							<Typography
								type="span"
								className="!text-lg text-secondary font-secondary"
							>
								{owner} (Domanda) - {questionsById[id].createdAt}
							</Typography>
							<Typography type="p" className="text-black font-body !text-lg">
								{questionsById[id].message}
							</Typography>
							{owner !== username && !questionsById[id].validAnswerId && (
								<Button
									text="Rispondi!"
									variant="secondary"
									className="font-secondary"
									disabled={
										!!bookAnswerUser ||
										Object.values(questionsById[id].answers.byId).filter(
											(answer) =>
												answer.isRejected && answer.playerName === username
										).length > 0 ||
										isOwnerThinking ||
										questionsById[id].isTimerExpired
									}
									onClick={bookAnswer}
								/>
							)}
						</div>
						{questionsById[id].answers.ids.map((answerId) => (
							<div
								id={answerId}
								className={`p-4 rounded-2xl justify-self-start flex gap-2 flex-col ${getAnswerBgColor(
									questionsById[id].validAnswerId === answerId,
									!!questionsById[id].answers.byId[answerId].isRejected
								)}`}
							>
								<Typography
									type="span"
									className="!text-lg text-secondary font-secondary"
								>
									{questionsById[id].answers.byId[answerId].playerName} -{' '}
									{questionsById[id].answers.byId[answerId].createdAt}
								</Typography>
								<Typography type="p" className="text-black font-body !text-lg">
									{questionsById[id].answers.byId[answerId].message}
								</Typography>
								{username === owner &&
									questionsById[id].answers.byId[answerId].isLastAnswer &&
									questionsById[id].answers.byId[answerId].id !==
										questionsById[id].validAnswerId &&
									!questionsById[id].answers.byId[answerId].isRejected && (
										<div className="flex gap-2 items-center w-full font-secondary justify-center">
											<Button
												text="Accetta"
												variant="secondary"
												icon={faCheck}
												iconPosition="right"
												onClick={onAcceptAnswer}
											/>
											<Button
												text="Rifiuta"
												variant="danger"
												icon={faTrash}
												iconPosition="right"
												onClick={onRejectAnswer}
											/>
										</div>
									)}
							</div>
						))}
					</li>
				))}
				{owner !== username && isOwnerTyping && (
					<li className="p-4 rounded-2xl justify-self-center bg-stone-200 flex gap-2 flex-col">
						<Typography type="p" className="text-black font-body !text-lg">
							L'owner sta preparando la domanda...
						</Typography>
					</li>
				)}
				{username !== bookAnswerUser && !!bookAnswerUser && (
					<li className="p-4 rounded-2xl justify-self-center bg-stone-200 flex gap-2 flex-col">
						<Typography type="p" className="text-black font-body !text-lg">
							L'utente {bookAnswerUser} sta rispondendo...
						</Typography>
					</li>
				)}
			</ul>
			<NotificationModal
				isOpened={!!isTimerExpiredModalOpened}
				notifyText="E' ora possibile creare una nuova domanda"
				title="Tempo Scaduto!"
				onConfirm={() => {
					setIsTimerExpiredModalOpened && setIsTimerExpiredModalOpened(false);
				}}
			/>
		</div>
	);
};

export default MessagesArea;
