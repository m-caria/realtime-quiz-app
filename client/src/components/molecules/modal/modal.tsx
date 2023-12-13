import { Button, Typography } from '../../atoms';
import { SizeKeys, sizeMaps } from './modal-maps';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
	title: string;
	isOpened: boolean;
	modalSize?: SizeKeys;
	onClose?: () => void;
} & Partial<React.HTMLAttributes<HTMLDivElement>>;

const Modal: React.FC<Props> = ({
	isOpened,
	onClose,
	modalSize = 'small',
	title,
	children,
	...props
}) => {
	return (
		isOpened && (
			<div
				className="relative z-10"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full justify-center text-center items-center p-0 text-primary">
						<div
							className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full ${sizeMaps[modalSize]}`}
						>
							<div
								{...props}
								className={`${props.className} bg-white px-4 pt-8 p-6 pb-4`}
							>
								<div className="absolute right-1 top-1">
									<Button
										variant="wrapper"
										icon={faTimes}
										title="Chiudi"
										className="text-stone-gray hover:bg-stone-gray hover:bg-opacity-30 hover:text-primary rounded-full"
										onClick={onClose}
									/>
								</div>
								<div className="flex flex-col gap-4 h-full">
									<Typography type="h2" className="text-center font-bold">
										{title}
									</Typography>
									{children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default Modal;
