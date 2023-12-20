import { Players } from '../Player';

export type OnPlayerJoinOrLeftInRoomMessage = {
	roomId: string;
	players: Players[];
};
