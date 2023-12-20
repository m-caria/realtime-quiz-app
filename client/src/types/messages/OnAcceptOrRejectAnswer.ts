export type OnAcceptOrRejectAnswerMessage = {
	roomId: string;
	questionId: string;
	answerId: string;
	isAccepted: boolean;
};
