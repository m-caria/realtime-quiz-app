import { DomainStatus } from '../../types';
import {
	QuestionState,
	OnQuestionCreatedActions,
	FullQuestion,
} from '../types';
import moment from 'moment';

export const onQuestionCreatedReceivedCase = (
	state: QuestionState,
	action: OnQuestionCreatedActions
): QuestionState => {
	const data: Record<string, FullQuestion> = {
		...state.data,
		[action.payload.roomId]: {
			currentQuestion: action.payload.id,
			byId: {
				...state.data[action.payload.roomId].byId,
				[action.payload.id]: {
					id: action.payload.id,
					countdown: 30,
					isTimerActive: true,
					message: action.payload.question,
					createdAt: `${moment(action.payload.createdAt).format(
						'L'
					)} - ${moment(action.payload.createdAt).format('LTS')}`,
					answers: { byId: {}, ids: [] },
				},
			},
			ids: [
				...new Set([
					...state.data[action.payload.roomId].ids,
					action.payload.id,
				]),
			],
		},
	};

	return {
		...state,
		data,
		rollbackData: data,
		status: DomainStatus.LOADED,
	};
};
