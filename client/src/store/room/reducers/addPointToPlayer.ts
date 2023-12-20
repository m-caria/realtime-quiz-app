import { DomainStatus, NormalizedModel } from '../../types';
import {
	AddPointToPlayerFailureAction,
	QuizRoomState,
	AddPointToPlayerSuccessAction,
	QuizRoom,
} from '../types';

export const addPointToPlayerRequestCase = (
	state: QuizRoomState
): QuizRoomState => {
	return {
		...state,
		data: {
			...state.data,
		},
		status: DomainStatus.LOADING,
		errors: null,
	};
};

export const addPointToPlayerSuccessCase = (
	state: QuizRoomState,
	action: AddPointToPlayerSuccessAction
): QuizRoomState => {
	const data: NormalizedModel<QuizRoom> = {
		...state.data,
		byId: {
			...state.data.byId,
			[action.payload.roomId]: {
				...state.data.byId[action.payload.roomId],
				players: [
					...action.payload.scores.map((player) => ({
						score: player.score,
						username: player.username,
						id: player.playerId,
					})),
				],
			},
		},
	};

	return {
		...state,
		data: { ...data, currentRoom: state.data.currentRoom },
		rollbackData: { ...data, currentRoom: state.data.currentRoom },
		status: DomainStatus.LOADED,
	};
};

export const addPointToPlayerFailureCase = (
	state: QuizRoomState,
	action: AddPointToPlayerFailureAction
): QuizRoomState => {
	return {
		...state,
		data: state.rollbackData ?? { currentRoom: '', byId: {}, ids: [] },
		status: DomainStatus.ERROR,
		errors: JSON.parse(action.payload.message),
	};
};
