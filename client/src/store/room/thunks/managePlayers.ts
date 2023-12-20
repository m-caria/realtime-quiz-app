import { createAsyncThunk } from '@reduxjs/toolkit';
import { ManagePlayersActionsType } from '../types';
import { ManagePlayersRequest, QuizRoomResponse } from '../../../types';
import { managePlayersApi } from '../apis';
import { isApiErrorType } from '../../../utils';

export const managePlayersThunk = createAsyncThunk(
	ManagePlayersActionsType.TRIGGER,
	async (payload: ManagePlayersRequest, { rejectWithValue }) => {
		try {
			const response = await managePlayersApi(payload);
			if (isApiErrorType<QuizRoomResponse>(response))
				return rejectWithValue(response);

			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
