import { DomainStatus } from '../../types';
import {
	QuestionState,
	OnAcceptOrRejectAnswerActions,
	FullQuestion,
} from '../types';

export const onValidAnswerReceivedCase = (
	state: QuestionState,
	action: OnAcceptOrRejectAnswerActions
): QuestionState => {
	const data: Record<string, FullQuestion> = {
		...state.data,
		[action.payload.roomId]: {
			...state.data[action.payload.roomId],
			currentQuestion: action.payload.isAccepted
				? ''
				: state.data[action.payload.roomId].currentQuestion,
			byId: {
				...state.data[action.payload.roomId].byId,
				[action.payload.questionId]: {
					...state.data[action.payload.roomId].byId[action.payload.questionId],
					validAnswerId: action.payload.isAccepted
						? action.payload.answerId
						: '',
					answers: {
						...state.data[action.payload.roomId].byId[action.payload.questionId]
							.answers,
						byId: {
							...state.data[action.payload.roomId].byId[
								action.payload.questionId
							].answers.byId,
							[action.payload.answerId]: {
								...state.data[action.payload.roomId].byId[
									action.payload.questionId
								].answers.byId[action.payload.answerId],
								isRejected: !action.payload.isAccepted,
							},
						},
					},
				},
			},
		},
	};

	return {
		...state,
		data,
		rollbackData: data,
		status: DomainStatus.LOADED,
	};
};
