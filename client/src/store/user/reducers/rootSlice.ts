import { createSlice } from '@reduxjs/toolkit';
import { DomainStatus } from '../../types';
import {
	ApplicationUserState,
	CreateUserActionsType,
	GetUserActionsType,
} from '../types';
import { createUserThunk, getUserThunk } from '../thunks';
import * as createUserCases from './createUser';
import * as getUserCases from './getUser';
import { APIError, UserResponse } from '../../../types';

const initialState: ApplicationUserState = {
	data: {},
	errors: null,
	rollbackData: {},
	status: DomainStatus.IDLE,
};

const applicationUserSlice = createSlice({
	name: 'APPLICATION_USER',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(createUserThunk.pending, (state, action) =>
				createUserCases.createUserRequestCase(state, {
					payload: action.meta.arg,
					type: CreateUserActionsType.REQUEST,
				})
			)
			.addCase(createUserThunk.fulfilled, (state, action) =>
				createUserCases.createUserSuccessCase(state, {
					payload: action.payload as UserResponse,
					type: CreateUserActionsType.SUCCESS,
				})
			)
			.addCase(createUserThunk.rejected, (state, action) =>
				createUserCases.createUserFailureCase(state, {
					payload: action.payload as APIError,
					type: CreateUserActionsType.FAILURE,
				})
			)
			.addCase(getUserThunk.pending, (state, action) =>
				getUserCases.getUserRequestCase(state, {
					payload: action.meta.arg,
					type: GetUserActionsType.REQUEST,
				})
			)
			.addCase(getUserThunk.fulfilled, (state, action) =>
				getUserCases.getUserSuccessCase(state, {
					payload: action.payload as UserResponse,
					type: GetUserActionsType.SUCCESS,
				})
			)
			.addCase(getUserThunk.rejected, (state, action) =>
				getUserCases.getUserFailureCase(state, {
					payload: action.payload as APIError,
					type: GetUserActionsType.FAILURE,
				})
			),
});

export default applicationUserSlice.reducer;
