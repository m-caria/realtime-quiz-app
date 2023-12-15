import { DomainStatus } from '../../types';
import {
	CreateUserFailureAction,
	ApplicationUserState,
	CreateUserRequestAction,
	CreateUserSuccessAction,
} from '../types';

export const createUserRequestCase = (
	state: ApplicationUserState,
	action: CreateUserRequestAction
): ApplicationUserState => {
	return {
		...state,
		data: { username: action.payload.username },
		status: DomainStatus.LOADING,
	};
};

export const createUserSuccessCase = (
	state: ApplicationUserState,
	action: CreateUserSuccessAction
): ApplicationUserState => {
	return {
		...state,
		data: action.payload,
		status: DomainStatus.LOADED,
	};
};

export const createUserFailureCase = (
	state: ApplicationUserState,
	action: CreateUserFailureAction
): ApplicationUserState => {
	return {
		...state,
		data: state.rollbackData ?? {},
		status: DomainStatus.ERROR,
		errors: JSON.parse(action.payload.message),
	};
};
