import { Button, Modal } from '../../../../components';

type Props = {
	title: string;
	notifyText: string;
	isOpened: boolean;
	onConfirm: () => void;
};

const Notification: React.FC<Props> = ({
	title,
	notifyText,
	onConfirm,
	isOpened,
}) => {
	return (
		<Modal
			className="font-secondary"
			modalSize="medium"
			isOpened={isOpened}
			title={title}
			closable={false}
		>
			<h1 className="text-center">{notifyText}</h1>
			<Button
				className="font-secondary"
				variant="secondary"
				text="Ok"
				title="OK"
				onClick={onConfirm}
			/>
		</Modal>
	);
};

export default Notification;
