import { DomainState, NormalizedModel } from '../../types';

export type Answer = {
	id: string;
	message: string;
	playerName: string;
	createdAt: string;
	isLastAnswer: boolean;
	isRejected?: boolean;
};

export type Question = {
	id: string;
	isTimerExpired?: boolean;
	isTimerActive?: boolean;
	countdown: number;
	message: string;
	createdAt: string;
	validAnswerId?: string;
	answers: NormalizedModel<Answer>;
};

export type FullQuestion = {
	currentQuestion: string;
} & NormalizedModel<Question>;

export type QuestionState = DomainState<Record<string, FullQuestion>>;
