import { useEffect, useState } from 'react';
import { Button, Modal, Typography } from '../../components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CreateRoomForm, QuizRoomList } from './components';
import { useNavigate } from 'react-router-dom';
import { usePreloader } from '../../hooks';

const HomePage: React.FC = () => {
	usePreloader();
	const navigate = useNavigate();
	const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

	useEffect(() => {
		const user = window.sessionStorage.getItem('user');
		if (!user) navigate('/pre-connect');
	}, [navigate]);

	return (
		<div className="h-full w-full pt-24 flex-col flex font-secondary">
			<Typography
				type="h1"
				className="text-primary font-bold text-center uppercase"
			>
				Benvenuto nell'app Realtime Quiz!
			</Typography>
			<div className="flex justify-center h-full items-center gap-8">
				<Button
					icon={faPlus}
					iconPosition="right"
					size="large"
					text="Crea Quiz Room"
					className="font-secondary"
					onClick={() => setIsCreateRoomModalOpen(true)}
				/>
				<div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
					<Typography type="h3" className="uppercase">
						Entra in una quiz room
					</Typography>
					<QuizRoomList />
				</div>
			</div>
			<Modal
				modalSize="medium"
				isOpened={isCreateRoomModalOpen}
				title="Crea una Quiz Room"
				onClose={() => setIsCreateRoomModalOpen(false)}
			>
				<CreateRoomForm isCreatingRoom />
			</Modal>
		</div>
	);
};

export default HomePage;
