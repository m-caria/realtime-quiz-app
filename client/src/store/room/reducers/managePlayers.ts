import { DomainStatus, NormalizedModel } from '../../types';
import {
	ManagePlayersFailureAction,
	QuizRoomState,
	ManagePlayersRequestAction,
	ManagePlayersSuccessAction,
	QuizRoom,
} from '../types';

export const managePlayersRequestCase = (
	state: QuizRoomState,
	action: ManagePlayersRequestAction
): QuizRoomState => {
	return {
		...state,
		data: {
			...state.data,
			byId: {
				...state.data.byId,
				[action.payload.roomId]: {
					...state.data.byId[action.payload.roomId],
					players: [
						...state.data.byId[action.payload.roomId].players,
						{ id: action.payload.playerId, username: '', score: 0 },
					],
				},
			},
		},
		status: DomainStatus.LOADING,
		errors: null,
	};
};

export const managePlayersSuccessCase = (
	state: QuizRoomState,
	action: ManagePlayersSuccessAction
): QuizRoomState => {
	const data: NormalizedModel<QuizRoom> = {
		...state.data,
		byId: {
			...state.data.byId,
			[action.payload.id]: {
				...state.data.byId[action.payload.id],
				players: [...state.data.byId[action.payload.id].players],
			},
		},
	};

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

export const managePlayersFailureCase = (
	state: QuizRoomState,
	action: ManagePlayersFailureAction
): QuizRoomState => {
	return {
		...state,
		data: state.rollbackData ?? { currentRoom: '', byId: {}, ids: [] },
		status: DomainStatus.ERROR,
		errors: JSON.parse(action.payload.message),
	};
};
