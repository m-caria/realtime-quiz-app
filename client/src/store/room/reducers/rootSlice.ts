import { createSlice } from '@reduxjs/toolkit';
import { DomainStatus } from '../../types';
import {
	QuizRoomState,
	CreateQuizRoomActionsType,
	QuizRoomsActionsType,
} from '../types';
import { createQuizRoomThunk, getQuizRoomsThunk } from '../thunks';
import * as createQuizRoomCases from './createQuizRoom';
import * as getQuizRoomsCases from './getQuizRooms';
import { APIError, QuizRoomResponse } from '../../../types';

const initialState: QuizRoomState = {
	data: { currentRoom: '', byId: {}, ids: [] },
	errors: null,
	rollbackData: undefined,
	status: DomainStatus.IDLE,
};

const quizRoomSlice = createSlice({
	name: 'QUIZ_ROOM',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(createQuizRoomThunk.pending, (state, action) =>
				createQuizRoomCases.createQuizRoomRequestCase(state, {
					payload: action.meta.arg,
					type: CreateQuizRoomActionsType.REQUEST,
				})
			)
			.addCase(createQuizRoomThunk.fulfilled, (state, action) =>
				createQuizRoomCases.createQuizRoomSuccessCase(state, {
					payload: action.payload as QuizRoomResponse,
					type: CreateQuizRoomActionsType.SUCCESS,
				})
			)
			.addCase(createQuizRoomThunk.rejected, (state, action) =>
				createQuizRoomCases.createQuizRoomFailureCase(state, {
					payload: action.payload as APIError,
					type: CreateQuizRoomActionsType.FAILURE,
				})
			)
			.addCase(getQuizRoomsThunk.pending, (state) =>
				getQuizRoomsCases.quizRoomsRequestCase(state)
			)
			.addCase(getQuizRoomsThunk.fulfilled, (state, action) =>
				getQuizRoomsCases.quizRoomsSuccessCase(state, {
					payload: action.payload as QuizRoomResponse[],
					type: QuizRoomsActionsType.SUCCESS,
				})
			)
			.addCase(getQuizRoomsThunk.rejected, (state, action) =>
				getQuizRoomsCases.quizRoomsFailureCase(state, {
					payload: action.payload as APIError,
					type: QuizRoomsActionsType.FAILURE,
				})
			),
});

export default quizRoomSlice.reducer;
