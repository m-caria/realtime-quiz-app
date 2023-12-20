import { DomainStatus } from '../../types';
import { QuestionState, OnAnswerActions, FullQuestion } from '../types';
import moment from 'moment';

export const onAnswerReceivedCase = (
	state: QuestionState,
	action: OnAnswerActions
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
					answers: {
						byId: {
							...Object.entries(
								state.data[action.payload.roomId].byId[
									action.payload.questionId
								].answers.byId
							).reduce(
								(prev, [key, value]) => ({
									...prev,
									[key]: { ...value, isLastAnswer: false },
								}),
								{}
							),
							[action.payload.id]: {
								id: action.payload.id,
								isLastAnswer: true,
								message: action.payload.answer,
								playerName: action.payload.playerName,
								createdAt: `${moment(action.payload.answerAt).format(
									'L'
								)} - ${moment(action.payload.answerAt).format('LTS')}`,
							},
						},
						ids: [
							...state.data[action.payload.roomId].byId[
								action.payload.questionId
							].answers.ids,
							action.payload.id,
						],
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
