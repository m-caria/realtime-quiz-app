export type QuizRoomScore = {
	playerId: string;
	score: number;
	username: string;
};

export type QuizRoomScoreResponse = {
	roomId: string;
	scores: QuizRoomScore[];
};
