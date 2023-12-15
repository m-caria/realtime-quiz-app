import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Typography from '../typography';
import {
	ButtonSize,
	ButtonVariant,
	IconPositionKeys,
	buttonSizes,
	buttonVariants,
	iconPositions,
} from './button-maps';

type Props = {
	icon?: IconProp;
	text?: string;
	variant?: ButtonVariant;
	iconPosition?: IconPositionKeys;
	isLoading?: boolean;
	size?: ButtonSize;
} & Partial<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
>;

const Button: React.FC<Props> = ({
	icon,
	text,
	iconPosition = 'left',
	variant = 'primary',
	size = 'medium',
	children,
	...props
}) => {
	return (
		<button
			{...props}
			className={`${props.className} ${iconPositions[iconPosition]} ${buttonVariants[variant]} ${buttonSizes[size]} disabled:bg-opacity-20 disabled:cursor-not-allowed box-border flex items-center justify-center rounded-xl px-4 py-2 uppercase transition-all duration-300 ease-in-out`}
		>
			{icon && <FontAwesomeIcon icon={icon} />}
			{text && <Typography className={buttonSizes[size]}>{text}</Typography>}
			{children}
		</button>
	);
};

export default Button;
