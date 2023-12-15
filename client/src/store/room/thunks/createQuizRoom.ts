import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateQuizRoomActionsType } from '../types';
import { CreateQuizRoomRequest, QuizRoomResponse } from '../../../types';
import { createQuizRoomApi } from '../apis';
import { isApiErrorType } from '../../../utils';

export const createQuizRoomThunk = createAsyncThunk(
	CreateQuizRoomActionsType.TRIGGER,
	async (payload: CreateQuizRoomRequest, { rejectWithValue }) => {
		try {
			const response = await createQuizRoomApi(payload);
			if (isApiErrorType<QuizRoomResponse>(response))
				return rejectWithValue(response);

			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
