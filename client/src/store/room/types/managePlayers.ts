import { PayloadAction } from '@reduxjs/toolkit';
import {
	APIError,
	ManagePlayersRequest,
	QuizRoomResponse,
} from '../../../types';

export enum ManagePlayersActionsType {
	TRIGGER = 'TRIGGER/MANAGE_PLAYERS',
	REQUEST = 'REQUEST/MANAGE_PLAYERS',
	SUCCESS = 'SUCCESS/MANAGE_PLAYERS',
	FAILURE = 'FAILURE/MANAGE_PLAYERS',
}

export type ManagePlayersRequestAction = PayloadAction<
	ManagePlayersRequest,
	ManagePlayersActionsType.REQUEST
>;
export type ManagePlayersSuccessAction = PayloadAction<
	QuizRoomResponse,
	ManagePlayersActionsType.SUCCESS
>;
export type ManagePlayersFailureAction = PayloadAction<
	APIError,
	ManagePlayersActionsType.FAILURE
>;

export type ManagePlayersActions =
	| ManagePlayersRequestAction
	| ManagePlayersSuccessAction
	| ManagePlayersFailureAction;
