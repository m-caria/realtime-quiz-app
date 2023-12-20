import { DomainStatus } from '../../types';
import { QuestionState, OnTimerUpdateActions, FullQuestion } from '../types';

export const onTimerUpdateReceivedCase = (
	state: QuestionState,
	action: OnTimerUpdateActions
): QuestionState => {
	const data: Record<string, FullQuestion> = {
		...state.data,
		[action.payload.roomId]: {
			...state.data[action.payload.roomId],
			byId: {
				...state.data[action.payload.roomId].byId,
				[action.payload.questionId]: {
					...state.data[action.payload.roomId].byId[action.payload.questionId],
					countdown: action.payload.seconds,
					isTimerActive: true,
					isTimerExpired: false,
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
