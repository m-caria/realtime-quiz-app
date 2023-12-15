import { DomainStatus } from '../../types';
import {
	GetUserFailureAction,
	ApplicationUserState,
	GetUserRequestAction,
	GetUserSuccessAction,
} from '../types';

export const getUserRequestCase = (
	state: ApplicationUserState,
	action: GetUserRequestAction
): ApplicationUserState => {
	return {
		...state,
		data: { username: action.payload.username },
		status: DomainStatus.LOADING,
	};
};

export const getUserSuccessCase = (
	state: ApplicationUserState,
	action: GetUserSuccessAction
): ApplicationUserState => {
	return {
		...state,
		data: action.payload,
		status: DomainStatus.LOADED,
	};
};

export const getUserFailureCase = (
	state: ApplicationUserState,
	action: GetUserFailureAction
): ApplicationUserState => {
	return {
		...state,
		data: state.rollbackData ?? {},
		status: DomainStatus.ERROR,
		errors: JSON.parse(action.payload.message),
	};
};
