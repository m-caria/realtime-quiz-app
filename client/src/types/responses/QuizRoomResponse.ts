import { UserResponse } from './UserResponse';

export type QuizRoomResponse = {
	id: string;
	name: string;
	owner: string;
	maxPartecipants: number;
	players: UserResponse[];
};
