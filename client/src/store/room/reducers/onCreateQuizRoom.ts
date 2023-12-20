import { DomainStatus, NormalizedModel } from '../../types';
import { QuizRoomState, OnCreateQuizRoomActions, QuizRoom } from '../types';

export const onCreateQuizRoomReceivedCase = (
	state: QuizRoomState,
	action: OnCreateQuizRoomActions
): QuizRoomState => {
	const data: NormalizedModel<QuizRoom> = {
		...state.data,
		byId: {
			...state.data.byId,
			[action.payload.id]: {
				isOwner: false,
				id: action.payload.id,
				maxPartecipants: action.payload.maxPlayers,
				name: action.payload.name,
				ownerName: action.payload.ownerName,
				players: [],
			},
		},
		ids: [...state.data.ids, action.payload.id],
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
