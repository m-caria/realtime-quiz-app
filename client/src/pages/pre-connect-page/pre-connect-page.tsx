import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Typography } from '../../components';
import { DomainStatus, useApplicationUser } from '../../store';
import { useCallback, useEffect } from 'react';
import { faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { serverErrors } from '../../constants';
import { usePreloader } from '../../hooks';

type FormData = {
	username: string;
};

const PreConnectPage: React.FC = () => {
	const navigate = useNavigate();
	usePreloader();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const {
		createUser,
		applicationUser: { data: user, status: userStatus, errors: userError },
	} = useApplicationUser();

	useEffect(() => {
		if (user.id && userStatus === DomainStatus.LOADED) {
			window.sessionStorage.setItem('user', JSON.stringify(user));
			navigate('/');
		}
	}, [navigate, user, userStatus]);

	const onSubmit: SubmitHandler<FormData> = useCallback(
		(data) => {
			createUser({ username: data.username });
		},
		[createUser]
	);

	return (
		<div className="h-full w-full pt-24 flex-col flex font-secondary">
			<Typography
				type="h1"
				className="text-primary font-bold text-center uppercase"
			>
				Prima di procedere registra il nome utente
			</Typography>
			<div className="flex flex-col justify-center h-full items-center gap-8">
				<form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
					<Input
						{...register('username', { required: true })}
						label="Nome utente"
						icon={faUser}
						disabled={!!user.username}
						placeholder="Inserisci il nome utente..."
						error={errors.username && 'Il campo nome utente è obbligatorio'}
					/>
					<Button
						icon={faArrowRight}
						iconPosition="right"
						variant="secondary"
						size="large"
						text="Procedi"
						className="font-secondary self-end"
						type="submit"
						disabled={userStatus === DomainStatus.LOADING}
					/>
				</form>
				{userError && (
					<Typography type="p" className="text-lg text-danger font-bold">
						{serverErrors[userError.internalCode as keyof typeof serverErrors]}
					</Typography>
				)}
			</div>
		</div>
	);
};

export default PreConnectPage;
