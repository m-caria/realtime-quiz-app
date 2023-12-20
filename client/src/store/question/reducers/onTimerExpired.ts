import { DomainStatus } from '../../types';
import { QuestionState, OnTimerExpiredActions, FullQuestion } from '../types';

export const onTimerExpiredCase = (
	state: QuestionState,
	action: OnTimerExpiredActions
): QuestionState => {
	const data: Record<string, FullQuestion> = {
		...state.data,
		[action.payload.roomId]: {
			...state.data[action.payload.roomId],
			currentQuestion: '',
			byId: {
				...state.data[action.payload.roomId].byId,
				[action.payload.questionId]: {
					...state.data[action.payload.roomId].byId[action.payload.questionId],
					isTimerActive: false,
					isTimerExpired: true,
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
