import { PayloadAction } from '@reduxjs/toolkit';
import { APIError, CreateUserRequest, UserResponse } from '../../../types';

export enum GetUserActionsType {
	TRIGGER = 'TRIGGER/GET_USER',
	REQUEST = 'REQUEST/GET_USER',
	SUCCESS = 'SUCCESS/GET_USER',
	FAILURE = 'FAILURE/GET_USER',
}

export type GetUserRequestAction = PayloadAction<
	CreateUserRequest,
	GetUserActionsType.REQUEST
>;
export type GetUserSuccessAction = PayloadAction<
	UserResponse,
	GetUserActionsType.SUCCESS
>;
export type GetUserFailureAction = PayloadAction<
	APIError,
	GetUserActionsType.FAILURE
>;

export type GetUserActions =
	| GetUserRequestAction
	| GetUserSuccessAction
	| GetUserFailureAction;
