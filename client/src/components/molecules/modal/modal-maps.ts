export type SizeKeys = 'small' | 'medium' | 'large' | 'giant' | 'full';
type SizeKeysMap = Record<SizeKeys, string>;

export const sizeMaps: SizeKeysMap = {
	small: 'max-w-lg',
	medium: 'max-w-2xl',
	large: 'max-w-4xl',
	giant: 'max-w-7xl',
	full: 'max-w-full mx-8',
};
