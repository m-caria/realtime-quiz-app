import { PayloadAction } from '@reduxjs/toolkit';
import {
	APIError,
	CreateQuizRoomRequest,
	QuizRoomResponse,
} from '../../../types';

export enum CreateQuizRoomActionsType {
	TRIGGER = 'TRIGGER/CREATE_QUIZ_ROOM',
	REQUEST = 'REQUEST/CREATE_QUIZ_ROOM',
	SUCCESS = 'SUCCESS/CREATE_QUIZ_ROOM',
	FAILURE = 'FAILURE/CREATE_QUIZ_ROOM',
}

export type CreateQuizRoomRequestAction = PayloadAction<
	CreateQuizRoomRequest,
	CreateQuizRoomActionsType.REQUEST
>;
export type CreateQuizRoomSuccessAction = PayloadAction<
	QuizRoomResponse,
	CreateQuizRoomActionsType.SUCCESS
>;
export type CreateQuizRoomFailureAction = PayloadAction<
	APIError,
	CreateQuizRoomActionsType.FAILURE
>;

export type CreateQuizRoomActions =
	| CreateQuizRoomRequestAction
	| CreateQuizRoomSuccessAction
	| CreateQuizRoomFailureAction;
