import { createSlice } from '@reduxjs/toolkit';
import { DomainStatus } from '../../types';
import {
	QuizRoomState,
	CreateQuizRoomActionsType,
	QuizRoomsActionsType,
	OnCreateQuizRoomActionsType,
	ManagePlayersActionsType,
	OnPlayerJoinOrLeftInRoomActionsType,
	AddPointToPlayerActionsType,
	OnAddPlayerScoreActionsType,
} from '../types';
import {
	addPointToPlayerThunk,
	createQuizRoomThunk,
	getQuizRoomsThunk,
	managePlayersThunk,
} from '../thunks';
import * as createQuizRoomCases from './createQuizRoom';
import * as getQuizRoomsCases from './getQuizRooms';
import * as onCreateQuizRoomCases from './onCreateQuizRoom';
import * as onPlayerJoinOrLeftInRoomCases from './onPlayerJoinOrLeftInRoom';
import * as managePlayersCases from './managePlayers';
import * as addPointToPlayerCases from './addPointToPlayer';
import * as onAddScoreToPlayerCases from './onAddScoreToPlayer';
import {
	APIError,
	OnAddPlayerScoreMessage,
	OnCreateQuizRoomMessage,
	OnPlayerJoinOrLeftInRoomMessage,
	QuizRoomResponse,
	QuizRoomScoreResponse,
} from '../../../types';

const initialState: QuizRoomState = {
	data: { currentRoom: '', byId: {}, ids: [] },
	errors: null,
	rollbackData: undefined,
	status: DomainStatus.IDLE,
};

const quizRoomSlice = createSlice({
	name: 'QUIZ_ROOM',
	initialState,
	reducers: {
		onCreateQuizRoom: (state, action) =>
			onCreateQuizRoomCases.onCreateQuizRoomReceivedCase(state, {
				payload: action.payload as OnCreateQuizRoomMessage,
				type: OnCreateQuizRoomActionsType.RECEIVED,
			}),
		onPlayerJoinOrLeftInRoom: (state, action) =>
			onPlayerJoinOrLeftInRoomCases.onPlayerJoinOrLeftInRoomReceivedCase(
				state,
				{
					payload: action.payload as OnPlayerJoinOrLeftInRoomMessage,
					type: OnPlayerJoinOrLeftInRoomActionsType.RECEIVED,
				}
			),
		onAddScoreToPlayer: (state, action) =>
			onAddScoreToPlayerCases.onAddPlayerScoreReceivedCase(state, {
				payload: action.payload as OnAddPlayerScoreMessage,
				type: OnAddPlayerScoreActionsType.RECEIVED,
			}),
	},
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
			)
			.addCase(managePlayersThunk.pending, (state, action) =>
				managePlayersCases.managePlayersRequestCase(state, {
					payload: action.meta.arg,
					type: ManagePlayersActionsType.REQUEST,
				})
			)
			.addCase(managePlayersThunk.fulfilled, (state, action) =>
				managePlayersCases.managePlayersSuccessCase(state, {
					payload: action.payload as QuizRoomResponse,
					type: ManagePlayersActionsType.SUCCESS,
				})
			)
			.addCase(managePlayersThunk.rejected, (state, action) =>
				managePlayersCases.managePlayersFailureCase(state, {
					payload: action.payload as APIError,
					type: ManagePlayersActionsType.FAILURE,
				})
			)
			.addCase(addPointToPlayerThunk.pending, (state) =>
				addPointToPlayerCases.addPointToPlayerRequestCase(state)
			)
			.addCase(addPointToPlayerThunk.fulfilled, (state, action) =>
				addPointToPlayerCases.addPointToPlayerSuccessCase(state, {
					payload: action.payload as QuizRoomScoreResponse,
					type: AddPointToPlayerActionsType.SUCCESS,
				})
			)
			.addCase(addPointToPlayerThunk.rejected, (state, action) =>
				addPointToPlayerCases.addPointToPlayerFailureCase(state, {
					payload: action.payload as APIError,
					type: AddPointToPlayerActionsType.FAILURE,
				})
			),
});

export const {
	onCreateQuizRoom,
	onPlayerJoinOrLeftInRoom,
	onAddScoreToPlayer,
} = quizRoomSlice.actions;
export default quizRoomSlice.reducer;
