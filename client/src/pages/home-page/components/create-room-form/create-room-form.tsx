import { faHouse, faUsers, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Input, Typography } from '../../../../components';
import { useCallback, useEffect, useState } from 'react';
import { useApplicationUser } from '../../../../store/user';
import { DomainStatus } from '../../../../store';
import { useQuizRoom } from '../../../../store/room';
import { useNavigate } from 'react-router-dom';
import { serverErrors } from '../../../../constants';

type FormData = {
	roomName: string;
	maxPartecipants: number;
};

type Props = {
	isCreatingRoom?: boolean;
};

const CreateRoomForm: React.FC<Props> = ({ isCreatingRoom = true }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [creatingRoom, setCreatingRoom] = useState(isCreatingRoom);
	const navigate = useNavigate();
	const {
		applicationUser: { data: user },
	} = useApplicationUser();
	const {
		createQuizRoom,
		quizRooms: {
			data: { currentRoom, byId: roomById },
			status: roomStatus,
			errors: roomError,
		},
	} = useQuizRoom();

	useEffect(() => {
		if (!roomError && roomStatus === DomainStatus.LOADED && !creatingRoom) {
			navigate(`/quiz-room/${currentRoom}`);
		}
	}, [
		creatingRoom,
		currentRoom,
		isCreatingRoom,
		navigate,
		roomById,
		roomError,
		roomStatus,
	]);

	const onSubmit: SubmitHandler<FormData> = useCallback(
		(data) => {
			if (user.id) {
				createQuizRoom({
					userId: user.id,
					maxPartecipants: data.maxPartecipants,
					name: data.roomName,
				});
				setCreatingRoom(false);
			}
		},
		[user.id, createQuizRoom]
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div className="flex gap-2">
				<Input
					{...register('roomName', { required: true })}
					className="basis-4/6"
					label="Nome Room"
					icon={faHouse}
					placeholder="Inserisci il nome della quiz room..."
					error={errors.roomName && 'Il campo nome stanza è obbligatorio'}
				/>
				<Input
					{...register('maxPartecipants')}
					className="basis-2/6"
					label="Partecipanti"
					icon={faUsers}
					placeholder="0"
					type="number"
					value={2}
				/>
			</div>
			{roomError && (
				<Typography type="p" className="text-lg text-danger font-bold">
					{serverErrors[roomError.internalCode as keyof typeof serverErrors]}
				</Typography>
			)}
			<Button
				icon={faPlus}
				iconPosition="right"
				variant="secondary"
				size="large"
				text="Crea Quiz Room"
				className="font-secondary"
				type="submit"
				disabled={roomStatus === DomainStatus.LOADING}
			/>
		</form>
	);
};

export default CreateRoomForm;
