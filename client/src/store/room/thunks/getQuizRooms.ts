import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuizRoomsActionsType } from '../types';
import { QuizRoomResponse } from '../../../types';
import { getQuizRoomsApi } from '../apis';
import { isApiErrorType } from '../../../utils';

export const getQuizRoomsThunk = createAsyncThunk(
	QuizRoomsActionsType.TRIGGER,
	async (_, { rejectWithValue }) => {
		try {
			const response = await getQuizRoomsApi();
			if (isApiErrorType<QuizRoomResponse[]>(response))
				return rejectWithValue(response);

			return response;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
