import { DomainStatus, NormalizedModel } from '../../types';
import {
	OnAddPlayerScoreReceivedAction,
	QuizRoomState,
	QuizRoom,
} from '../types';

export const onAddPlayerScoreReceivedCase = (
	state: QuizRoomState,
	action: OnAddPlayerScoreReceivedAction
): QuizRoomState => {
	const players = new Set([
		...state.data.byId[action.payload.roomId].players.filter(
			(player) => player.id !== action.payload.playerId
		),
		{
			score: action.payload.score,
			id: action.payload.playerId,
			username: action.payload.username,
		},
	]);

	const data: NormalizedModel<QuizRoom> = {
		...state.data,
		byId: {
			...state.data.byId,
			[action.payload.roomId]: {
				...state.data.byId[action.payload.roomId],
				winner: [...players].find((player) => player.score === 5)?.username,
				players: [...players],
			},
		},
	};

	return {
		...state,
		data: {
			...data,
			currentRoom: state.data.currentRoom,
		},
		rollbackData: { ...data, currentRoom: state.data.currentRoom },
		status: DomainStatus.LOADING,
		errors: null,
	};
};
