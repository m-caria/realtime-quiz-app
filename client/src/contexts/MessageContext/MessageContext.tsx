import React from 'react';
import { Question } from '../../store/question/types';
import { OnAnswerMessage } from '../../types';

type Props = {
	currentQuestion: string;
	isOwnerTyping: boolean;
	questionsById: Record<string, Question>;
	questionsIds: string[];
	question: string;
	answer?: string;
	isTimerExpiredModalOpened?: boolean;
	onCreatedAnswer?: (payload: OnAnswerMessage) => void;
	onAcceptAnswer?: () => void;
	onRejectAnswer?: () => void;
	onOwnerTyping?: (isTyping: boolean) => void;
	setQuestion?: React.Dispatch<React.SetStateAction<string>>;
	setAnswer?: React.Dispatch<React.SetStateAction<string>>;
	sendAnswer?: (username: string, questionId: string) => void;
	onPublishQuestion?: () => void;
	setIsTimerExpiredModalOpened?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuizRoomMessageContext = React.createContext<Props>({
	currentQuestion: '',
	isOwnerTyping: false,
	question: '',
	questionsById: {},
	questionsIds: [],
});
