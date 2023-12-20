import React from 'react';
import Typography from '../typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
	error?: string;
	icon?: IconProp;
	label?: string;
	placeholder?: string;
} & Partial<
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	>
>;

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
	({ icon, placeholder, error, label, ...props }, ref) => (
		<div className={`${props.className} flex w-full flex-col gap-2 md:gap-4`}>
			{label && (
				<label
					htmlFor={props.id}
					className="text-md -mb-1 text-stone-gray md:-mb-3 md:text-lg"
				>
					{label}:
				</label>
			)}
			<div className="relative text-primary focus-within:text-primary">
				{icon && (
					<FontAwesomeIcon
						icon={icon}
						className="absolute inset-y-0 left-0 top-[33%] flex items-center pl-2 md:pl-4"
					/>
				)}
				<textarea
					{...props}
					ref={ref}
					className={`${props.className} ${
						error
							? 'border-danger text-danger placeholder:text-danger'
							: 'border-primary text-primary placeholder:text-stone-gray'
					} box-border w-full rounded-xl border-2 py-2 text-sm focus:outline-none md:pr-2 md:text-lg disabled:!bg-stone-200 ${
						icon || placeholder ? 'pl-10 md:pl-12' : 'pl-2 md:pl-4'
					}`}
					placeholder={placeholder}
				/>
			</div>
			{error && (
				<Typography type="span" className="text-xxs -mt-2 text-danger">
					{error}
				</Typography>
			)}
		</div>
	)
);

export default TextArea;
