import { PayloadAction } from '@reduxjs/toolkit';
import { APIError, CreateUserRequest, UserResponse } from '../../../types';

export enum CreateUserActionsType {
	TRIGGER = 'TRIGGER/CREATE_USER',
	REQUEST = 'REQUEST/CREATE_USER',
	SUCCESS = 'SUCCESS/CREATE_USER',
	FAILURE = 'FAILURE/CREATE_USER',
}

export type CreateUserRequestAction = PayloadAction<
	CreateUserRequest,
	CreateUserActionsType.REQUEST
>;
export type CreateUserSuccessAction = PayloadAction<
	UserResponse,
	CreateUserActionsType.SUCCESS
>;
export type CreateUserFailureAction = PayloadAction<
	APIError,
	CreateUserActionsType.FAILURE
>;

export type CreateUserActions =
	| CreateUserRequestAction
	| CreateUserSuccessAction
	| CreateUserFailureAction;
