import { useContext, useMemo } from 'react';
import { Typography } from '../../../../components';
import { QuizRoomResponse } from '../../../../types';
import { QuizRoomMessageContext } from '../../../../contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
	username: string;
	room: QuizRoomResponse;
};

const SideMenu: React.FC<Props> = ({ room, username }) => {
	const { currentQuestion, questionsById } = useContext(QuizRoomMessageContext);

	const playerList = useMemo(() => {
		return (
			room.players &&
			room.players
				.filter((player) => player.username !== room.ownerName)
				.map((player, idx) => (
					<li
						key={`${player.id}--${idx}`}
						className="px-4 flex justify-between items-center"
					>
						<div className="flex gap-2 items-center">
							<Typography type="p" className="text-lg">
								{player.username} {player.username === username && '(Tu)'}
							</Typography>
							{currentQuestion &&
								Object.values(questionsById[currentQuestion].answers.byId).find(
									(answer) =>
										answer.isRejected && answer.playerName === player.username
								) && (
									<FontAwesomeIcon icon={faTimes} className="!text-danger" />
								)}
						</div>

						<Typography type="span" className="text-lg">
							{player.score ?? 0}/5
						</Typography>
					</li>
				))
		);
	}, [currentQuestion, questionsById, room.ownerName, room.players, username]);

	return (
		<div className="h-full col-span-2 row-span-full bg-stone-100 text-primary font-secondary flex flex-col rounded-r-2xl">
			<Typography type="h5" className="p-4 text-center uppercase">
				{room.name}
			</Typography>
			<hr className="bg-stone-400 h-1 mt-0" />
			<ul className="text-black flex flex-col gap-4 py-4">
				<li className="px-4" key={room.ownerName}>
					<Typography type="p" className="text-xl text-secondary uppercase">
						{room.ownerName} (Owner)
					</Typography>
				</li>
				{playerList}
			</ul>
		</div>
	);
};

export default SideMenu;
