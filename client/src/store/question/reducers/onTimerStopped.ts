import { DomainStatus } from '../../types';
import { QuestionState, OnStopTimerActions, FullQuestion } from '../types';

export const onTimerStoppedReceivedCase = (
	state: QuestionState,
	action: OnStopTimerActions
): QuestionState => {
	const data: Record<string, FullQuestion> = {
		...state.data,
		[action.payload.roomId]: {
			...state.data[action.payload.roomId],
			byId: {
				...state.data[action.payload.roomId].byId,
				[action.payload.questionId]: {
					...state.data[action.payload.roomId].byId[action.payload.questionId],
					isTimerActive: false,
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
