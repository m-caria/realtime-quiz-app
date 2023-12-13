export type ButtonVariant = 'wrapper' | 'primary' | 'secondary';
type ButtonVariantMap = Record<ButtonVariant, string>;

export type IconPositionKeys = 'left' | 'right';
type IconPositionMap = Record<IconPositionKeys, string>;

export type ButtonSize = 'small' | 'medium' | 'large';
type ButtonSizeMap = Record<ButtonSize, string>;

export const iconPositions: IconPositionMap = {
	left: 'flex-row gap-2',
	right: 'flex-row-reverse gap-2',
};

export const buttonVariants: ButtonVariantMap = {
	wrapper: 'bg-transparent hover:bg-opacity-50',
	primary: 'bg-primary text-white hover:bg-opacity-80',
	secondary: 'bg-secondary text-white hover:bg-opacity-80',
};

export const buttonSizes: ButtonSizeMap = {
	large: 'md:text-2xl text-lg',
	medium: 'md:text-lg text-md',
	small: 'md:text-md text-sm',
};
