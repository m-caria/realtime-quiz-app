import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddPointToPlayerActionsType } from '../types';
import { AddPointToPlayerRequest, QuizRoomScoreResponse } from '../../../types';
import { addPointToPlayerApi } from '../apis';
import { isApiErrorType } from '../../../utils';

export const addPointToPlayerThunk = createAsyncThunk(
	AddPointToPlayerActionsType.TRIGGER,
	async (payload: AddPointToPlayerRequest, { rejectWithValue }) => {
		try {
			const response = await addPointToPlayerApi(payload);
			if (isApiErrorType<QuizRoomScoreResponse>(response))
				return rejectWithValue(response);

			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
