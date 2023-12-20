import { DomainStatus, NormalizedModel } from '../../types';
import {
	QuizRoomState,
	OnPlayerJoinOrLeftInRoomActions,
	QuizRoom,
} from '../types';

export const onPlayerJoinOrLeftInRoomReceivedCase = (
	state: QuizRoomState,
	action: OnPlayerJoinOrLeftInRoomActions
): QuizRoomState => {
	const data: NormalizedModel<QuizRoom> = {
		...state.data,
		byId: {
			...state.data.byId,
			[action.payload.roomId]: {
				...state.data.byId[action.payload.roomId],
				players: action.payload.players,
			},
		},
	};

	return {
		...state,
		data: {
			currentRoom: action.payload.roomId,
			...data,
		},
		rollbackData: {
			currentRoom: action.payload.roomId,
			...data,
		},
		status: DomainStatus.LOADED,
	};
};
