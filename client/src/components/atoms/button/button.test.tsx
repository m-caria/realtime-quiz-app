import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from './button';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

describe('Button', () => {
	it('button should be rendered', () => {
		render(<Button />);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.childElementCount).toBe(0);
	});

	it('button should be rendered with text', () => {
		render(<Button text="Hello" />);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.childElementCount).toBe(1);
		expect(button.firstChild?.textContent).toBe('Hello');
	});

	it('button should render icon', () => {
		render(<Button icon={faTimes} />);
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.childElementCount).toBe(1);
	});
});
