type TypographyKeys = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TypographyMap = Record<TypographyKeys, JSX.Element>;

type Props = {
	type?: TypographyKeys;
} & (
	| Partial<React.HTMLAttributes<HTMLHeadingElement>>
	| Partial<React.HTMLAttributes<HTMLParagraphElement>>
	| Partial<React.HTMLAttributes<HTMLSpanElement>>
);

const typographies = ({
	children,
	className,
	...props
}: Props): TypographyMap => ({
	h1: (
		<h1 {...props} className={`${className ?? ''} text-4xl md:text-6xl`}>
			{children}
		</h1>
	),
	h2: (
		<h2 {...props} className={`${className ?? ''} text-3xl md:text-4xl`}>
			{children}
		</h2>
	),
	h3: (
		<h3 {...props} className={`${className ?? ''} text-2xl md:text-3xl`}>
			{children}
		</h3>
	),
	h4: (
		<h4 {...props} className={`${className ?? ''} text-xl md:text-2xl`}>
			{children}
		</h4>
	),
	h5: (
		<h5 {...props} className={`${className ?? ''} text-lg md:text-xl`}>
			{children}
		</h5>
	),
	h6: (
		<h6 {...props} className={`${className ?? ''} text-md md:text-lg`}>
			{children}
		</h6>
	),
	p: (
		<p {...props} className={`${className ?? ''} text-sm md:text-md`}>
			{children}
		</p>
	),
	span: (
		<span {...props} className={`${className ?? ''} text-sm md:text-md`}>
			{children}
		</span>
	),
});

const Typography: React.FC<Props> = ({ type = 'p', ...props }) => {
	return typographies({ type, ...props })[type];
};

export default Typography;
