import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../..';
import { getApplicationUserState } from '../selectors';
import { CreateUserRequest } from '../../../types';
import { createUserThunk, getUserThunk } from '../thunks';

export const useApplicationUser = () => {
	const dispatch = useAppDispatch();
	const applicationUser = useAppSelector(getApplicationUserState);

	const createUser = useCallback(
		(payload: CreateUserRequest) => {
			dispatch(createUserThunk(payload));
		},
		[dispatch]
	);

	const getUser = useCallback(
		(payload: CreateUserRequest) => {
			dispatch(getUserThunk(payload));
		},
		[dispatch]
	);

	return {
		applicationUser,
		createUser,
		getUser,
	};
};
