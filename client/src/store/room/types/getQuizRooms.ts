import { Action, PayloadAction } from '@reduxjs/toolkit';
import { APIError, QuizRoomResponse } from '../../../types';

export enum QuizRoomsActionsType {
	TRIGGER = 'TRIGGER/QUIZ_ROOMS',
	REQUEST = 'REQUEST/QUIZ_ROOMS',
	SUCCESS = 'SUCCESS/QUIZ_ROOMS',
	FAILURE = 'FAILURE/QUIZ_ROOMS',
}

export type QuizRoomsRequestAction = Action<QuizRoomsActionsType.REQUEST>;
export type QuizRoomsSuccessAction = PayloadAction<
	QuizRoomResponse[],
	QuizRoomsActionsType.SUCCESS
>;
export type QuizRoomsFailureAction = PayloadAction<
	APIError,
	QuizRoomsActionsType.FAILURE
>;

export type QuizRoomsActions =
	| QuizRoomsRequestAction
	| QuizRoomsSuccessAction
	| QuizRoomsFailureAction;
