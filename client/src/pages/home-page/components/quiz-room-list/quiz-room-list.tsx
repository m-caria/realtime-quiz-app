import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '../../../../components';
import { useQuizRoom } from '../../../../store';

const QuizRoomList: React.FC = () => {
	const { quizRoomIds, quizRoomByIds } = useQuizRoom();
	const navigate = useNavigate();

	return (
		<ul className="border-2 border-primary flex flex-col gap-2 rounded-xl p-4">
			{quizRoomIds.map((id) => (
				<li key={id} className="flex justify-between items-center gap-2">
					<Button
						variant="wrapper"
						className="!bg-stone-400 hover:!bg-opacity-70 w-full flex justify-between"
						onClick={() => navigate(`/quiz-room/${id}`)}
					>
						<Typography type="span" className="!text-xl">
							{quizRoomByIds[id].name}
						</Typography>
						<div className="flex gap-2 items-center">
							<div className="rounded-full w-3 h-3 bg-primary border-[1px] border-black" />
							<Typography type="span" className="!text-lg">
								{`${quizRoomByIds[id].players.length}/${quizRoomByIds[id].maxPartecipants}`}
							</Typography>
						</div>
					</Button>
					<Typography type="span">30s</Typography>
				</li>
			))}
		</ul>
	);
};

export default QuizRoomList;
