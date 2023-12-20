import { PayloadAction } from '@reduxjs/toolkit';
import {
	APIError,
	AddPointToPlayerRequest,
	QuizRoomScoreResponse,
} from '../../../types';

export enum AddPointToPlayerActionsType {
	TRIGGER = 'TRIGGER/ADD_POINT_TO_PLAYER',
	REQUEST = 'REQUEST/ADD_POINT_TO_PLAYER',
	SUCCESS = 'SUCCESS/ADD_POINT_TO_PLAYER',
	FAILURE = 'FAILURE/ADD_POINT_TO_PLAYER',
}

export type AddPointToPlayerRequestAction = PayloadAction<
	AddPointToPlayerRequest,
	AddPointToPlayerActionsType.REQUEST
>;
export type AddPointToPlayerSuccessAction = PayloadAction<
	QuizRoomScoreResponse,
	AddPointToPlayerActionsType.SUCCESS
>;
export type AddPointToPlayerFailureAction = PayloadAction<
	APIError,
	AddPointToPlayerActionsType.FAILURE
>;

export type AddPointToPlayerActions =
	| AddPointToPlayerRequestAction
	| AddPointToPlayerSuccessAction
	| AddPointToPlayerFailureAction;
