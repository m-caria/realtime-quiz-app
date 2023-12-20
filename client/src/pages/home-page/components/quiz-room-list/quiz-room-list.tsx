import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '../../../../components';
import { useApplicationUser, useQuizRoom } from '../../../../store';
import { useCallback } from 'react';
import { SignalRContext } from '../../../../contexts';

const QuizRoomList: React.FC = () => {
	const {
		applicationUser: {
			data: { id: userId },
		},
	} = useApplicationUser();
	const { quizRoomIds, quizRoomByIds, managePlayers } = useQuizRoom();
	const navigate = useNavigate();

	const onJoinInRoom = useCallback(
		(roomId: string) => {
			if (userId) {
				managePlayers({ roomId, playerId: userId, isJoined: true });
				SignalRContext.invoke('CreateGroup', roomId);
				navigate(`/quiz-room/${roomId}`);
			}
		},
		[managePlayers, navigate, userId]
	);

	const roomSizeSemaphore = useCallback(
		(id: string) => {
			const isFull =
				quizRoomByIds[id].players.length === quizRoomByIds[id].maxPartecipants;
			const isOverHalfSize =
				quizRoomByIds[id].players.length >=
				quizRoomByIds[id].maxPartecipants / 2;
			const isEmpty =
				quizRoomByIds[id].players.length <
				quizRoomByIds[id].maxPartecipants / 2;

			if (isFull)
				return (
					<div className="rounded-full w-3 h-3 bg-danger border-[1px] border-black" />
				);

			if (isOverHalfSize)
				return (
					<div className="rounded-full w-3 h-3 bg-yellow-500 border-[1px] border-black" />
				);

			if (isEmpty)
				return (
					<div className="rounded-full w-3 h-3 bg-secondary border-[1px] border-black" />
				);
		},
		[quizRoomByIds]
	);

	return (
		<ul className="border-2 border-primary flex flex-col gap-2 rounded-xl p-4">
			{quizRoomIds.map((id) => (
				<li key={id} className="flex justify-between items-center gap-2">
					<Button
						variant="wrapper"
						className="!bg-stone-400 hover:!bg-opacity-70 w-full flex justify-between"
						disabled={
							quizRoomByIds[id].players.length ===
							quizRoomByIds[id].maxPartecipants
						}
						onClick={() => onJoinInRoom(id)}
					>
						<Typography type="span" className="!text-xl">
							{quizRoomByIds[id].winner ?? quizRoomByIds[id].name}
						</Typography>
						<div className="flex gap-2 items-center">
							{roomSizeSemaphore(id)}
							<Typography type="span" className="!text-lg">
								{`${quizRoomByIds[id].players.length}/${quizRoomByIds[id].maxPartecipants}`}
							</Typography>
						</div>
					</Button>
				</li>
			))}
		</ul>
	);
};

export default QuizRoomList;
