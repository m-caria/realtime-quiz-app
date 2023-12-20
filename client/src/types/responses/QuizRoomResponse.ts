import { Players } from '../Player';

export type QuizRoomResponse = {
	id: string;
	name: string;
	ownerName: string;
	maxPartecipants: number;
	winner?: string;
	players: Players[];
};
