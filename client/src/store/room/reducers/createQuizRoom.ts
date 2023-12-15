import { DomainStatus, NormalizedModel } from '../../types';
import {
	CreateQuizRoomFailureAction,
	QuizRoomState,
	CreateQuizRoomRequestAction,
	CreateQuizRoomSuccessAction,
	QuizRoom,
} from '../types';

export const createQuizRoomRequestCase = (
	state: QuizRoomState,
	action: CreateQuizRoomRequestAction
): QuizRoomState => {
	return {
		...state,
		data: {
			...state.data,
			byId: {
				...state.data.byId,
				'0': {
					isOwner: true,
					id: '0',
					owner: action.payload.userId,
					players: [],
					...action.payload,
				},
			},
			ids: [...state.data.ids, '0'],
		},
		status: DomainStatus.LOADING,
		errors: null,
	};
};

export const createQuizRoomSuccessCase = (
	state: QuizRoomState,
	action: CreateQuizRoomSuccessAction
): QuizRoomState => {
	const data: NormalizedModel<QuizRoom> = {
		...state.data,
		byId: {
			...state.data.byId,
			[action.payload.id]: {
				isOwner: true,
				...action.payload,
			},
		},
		ids: [...state.data.ids, action.payload.id],
	};

	delete data.byId['0'];
	data.ids = data.ids.filter((id) => id !== '0');

	return {
		...state,
		data: {
			...data,
			currentRoom: action.payload.id,
		},
		rollbackData: {
			...data,
			currentRoom: action.payload.id,
		},
		status: DomainStatus.LOADED,
	};
};

export const createQuizRoomFailureCase = (
	state: QuizRoomState,
	action: CreateQuizRoomFailureAction
): QuizRoomState => {
	console.log(action.payload);
	return {
		...state,
		data: state.rollbackData ?? { currentRoom: '', byId: {}, ids: [] },
		status: DomainStatus.ERROR,
		errors: JSON.parse(action.payload.message),
	};
};
