import { QuizRoomResponse } from '../../../types';
import { DomainState, NormalizedModel } from '../../types';

export type QuizRoom = {
	isOwner: boolean;
	winner?: string;
} & QuizRoomResponse;

export type QuizRoomState = DomainState<
	{ currentRoom: string } & NormalizedModel<QuizRoom>
>;
