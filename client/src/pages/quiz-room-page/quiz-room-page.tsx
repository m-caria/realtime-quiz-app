import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Button, Typography } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplicationUser, useQuestions, useQuizRoom } from '../../store';
import { useCallback, useState } from 'react';
import { useMessages, usePreloader } from '../../hooks';
import { MessageContextProvider, SignalRContext } from '../../contexts';
import { OnPlayerJoinOrLeftInRoomMessage } from '../../types';
import {
	MessagesArea,
	NotificationModal,
	RoomInput,
	SideMenu,
} from './components';

const QuizRoomPage: React.FC = () => {
	usePreloader();
	const { roomId } = useParams();
	const navigate = useNavigate();
	const {
		applicationUser: {
			data: { id, username },
		},
	} = useApplicationUser();
	const { quizRoomByIds, managePlayers, onPlayerJoinOrLeftInQuizRoom } =
		useQuizRoom();
	const [bookAnswerUser, setBookAnswerUser] = useState('');
	const { currentQuestion, questionsById } = useQuestions(roomId as string);
	const { isOwnerThinking, setIsOwnerThinking } = useMessages(roomId as string);

	SignalRContext.useSignalREffect(
		'OnPlayerJoinOrLeftInRoom',
		(data: OnPlayerJoinOrLeftInRoomMessage) => {
			onPlayerJoinOrLeftInQuizRoom(data);
		},
		[]
	);

	const onLeaveFromRoom = useCallback(() => {
		if (id) {
			managePlayers({
				isJoined: false,
				playerId: id,
				roomId: roomId as string,
			});
			navigate('/');
		}
	}, [id, managePlayers, navigate, roomId]);

	return (
		quizRoomByIds[roomId as string] && (
			<MessageContextProvider roomId={roomId as string}>
				<div className="grid grid-cols-12 grid-rows-6 gap-4 h-full">
					<SideMenu
						room={quizRoomByIds[roomId as string]}
						username={username ?? ''}
					/>
					<div className="col-start-3 col-end-13 row-start-1 row-end-1 grid grid-cols-12 grid-rows-1 py-4">
						<Typography type="h1" className="!text-4xl col-start-7 col-end-7">
							{currentQuestion ? questionsById[currentQuestion].countdown : 30}s
						</Typography>
						<Button
							variant="wrapper"
							icon={faRightFromBracket}
							className="justify-self-end mr-4 col-start-12 col-end-12 h-12 !bg-primary"
							onClick={onLeaveFromRoom}
						/>
					</div>
					<MessagesArea
						owner={quizRoomByIds[roomId as string].ownerName}
						bookAnswerUser={bookAnswerUser}
						roomId={roomId as string}
						onBookAnswer={setBookAnswerUser}
						isOwnerThinking={isOwnerThinking}
					/>
					<RoomInput
						room={quizRoomByIds[roomId as string]}
						username={username ?? ''}
						bookAnswerUser={bookAnswerUser}
						setIsOwnerThinking={setIsOwnerThinking}
					/>
					<NotificationModal
						isOpened={!!quizRoomByIds[roomId as string].winner}
						notifyText={
							quizRoomByIds[roomId as string].winner === username
								? 'HAI VINTO!'
								: `${quizRoomByIds[roomId as string].winner} ha vinto!`
						}
						title="Vincitore"
						onConfirm={onLeaveFromRoom}
					/>
				</div>
			</MessageContextProvider>
		)
	);
};

export default QuizRoomPage;
