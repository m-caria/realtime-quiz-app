import {
	faPaperPlane,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Typography } from '../../components';
import { useNavigate } from 'react-router-dom';

const QuizRoomPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="grid grid-cols-12 grid-rows-6 gap-4 h-full">
			<div className="h-full col-span-2 row-span-full bg-stone-100 text-primary font-secondary flex flex-col rounded-r-2xl">
				<Typography type="h5" className="p-4 text-center uppercase">
					Room Name
				</Typography>

				<hr className="bg-stone-400 h-1 mt-0" />
				<ul className="text-black flex flex-col gap-4 py-4">
					<li className="px-4">
						<Typography type="p" className="text-xl text-secondary uppercase">
							Owner
						</Typography>
					</li>
					<li className="px-4 flex justify-between">
						<Typography type="p" className="text-xl">
							Player 1
						</Typography>
						<Typography type="span" className="text-lg">
							1/5
						</Typography>
					</li>
					<li className="px-4  flex justify-between">
						<Typography type="p" className="text-xl">
							Player 1
						</Typography>
						<Typography type="span" className="text-lg">
							3/5
						</Typography>
					</li>
				</ul>
			</div>
			<div className="col-start-3 col-end-13 row-start-1 row-end-1 grid grid-cols-12 grid-rows-1 py-4">
				<Typography type="h1" className="!text-4xl col-start-7 col-end-7">
					30s
				</Typography>
				<Button
					variant="wrapper"
					icon={faRightFromBracket}
					className="justify-self-end mr-4 col-start-12 col-end-12 h-12 !bg-primary"
					onClick={() => navigate('/')}
				/>
			</div>
			<div className="col-start-3 col-end-13 row-start-2 row-end-6 w-full grid items-end mr-4 overflow-y-auto">
				<ul className="grid gap-2">
					<li className="p-4 bg-orange-300 rounded-2xl justify-self-start flex gap-2 flex-col mr-4 max-w-[45%]">
						<Typography
							type="span"
							className="!text-lg text-secondary font-secondary"
						>
							Owner (Question) - 11/12/2023 11:56:33
						</Typography>
						<Typography type="p" className="text-black font-body !text-lg">
							Hello asd iasdiuashdu asjd ioasjd aosidash duash dasiod aosd oaisd
							oasid aiosd aisod oaisjd ioasdi asjiodjaisodjo asiodj
						</Typography>
					</li>
					<li className="p-4 bg-stone-200 rounded-2xl justify-self-start max-w-[45%]">
						<Typography
							type="span"
							className="!text-lg text-secondary font-secondary"
						>
							Player 1 - 11/12/2023 11:56:33
						</Typography>
						<Typography type="p" className="text-black font-body !text-lg">
							Hello from friend
						</Typography>
					</li>
				</ul>
			</div>
			<div className="col-start-3 col-end-13 row-start-6 row-end-auto flex mb-2 items-end mr-4">
				<Input placeholder="Poni una domanda..." icon={faPaperPlane} />
			</div>
		</div>
	);
};

export default QuizRoomPage;
