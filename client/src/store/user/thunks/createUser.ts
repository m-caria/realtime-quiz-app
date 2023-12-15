import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateUserActionsType } from '../types';
import { CreateUserRequest, UserResponse } from '../../../types';
import { createUserApi } from '../apis';
import { isApiErrorType } from '../../../utils';

export const createUserThunk = createAsyncThunk(
	CreateUserActionsType.TRIGGER,
	async (payload: CreateUserRequest, { rejectWithValue }) => {
		try {
			const response = await createUserApi(payload);
			if (isApiErrorType<UserResponse>(response))
				return rejectWithValue(response);

			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
