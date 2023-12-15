import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetUserActionsType } from '../types';
import { CreateUserRequest, UserResponse } from '../../../types';
import { getUserApi } from '../apis';
import { isApiErrorType } from '../../../utils';

export const getUserThunk = createAsyncThunk(
	GetUserActionsType.TRIGGER,
	async (payload: CreateUserRequest, { rejectWithValue }) => {
		try {
			const response = await getUserApi(payload.username);
			if (isApiErrorType<UserResponse>(response))
				return rejectWithValue(response);

			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
