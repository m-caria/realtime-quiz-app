import { DomainStatus } from '../../types';
import {
	QuizRoomsFailureAction,
	QuizRoomsSuccessAction,
	QuizRoomState,
} from '../types';

export const quizRoomsRequestCase = (state: QuizRoomState): QuizRoomState => {
	return {
		...state,
		errors: null,
		status: DomainStatus.LOADING,
	};
};

export const quizRoomsSuccessCase = (
	state: QuizRoomState,
	action: QuizRoomsSuccessAction
): QuizRoomState => ({
	data: {
		...state.data,
		ids: [
			...new Set([...state.data.ids, ...action.payload.map((room) => room.id)]),
		],
		byId: {
			...state.data.byId,
			...Object.values(action.payload).reduce(
				(prev, curr) => ({
					...prev,
					[curr.id]: curr,
				}),
				{}
			),
		},
	},
	status: DomainStatus.LOADED,
});

export const quizRoomsFailureCase = (
	state: QuizRoomState,
	action: QuizRoomsFailureAction
): QuizRoomState => {
	return {
		...state,
		data: state.rollbackData ?? { currentRoom: '', byId: {}, ids: [] },
		status: DomainStatus.ERROR,
		errors: JSON.parse(action.payload.message),
	};
};
