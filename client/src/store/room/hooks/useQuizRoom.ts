import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getQuizRoomByIds,
	getQuizRoomIds,
	getQuizRoomState,
} from '../selectors';
import {
	AddPointToPlayerRequest,
	CreateQuizRoomRequest,
	ManagePlayersRequest,
	OnAddPlayerScoreMessage,
	OnCreateQuizRoomMessage,
	OnPlayerJoinOrLeftInRoomMessage,
} from '../../../types';
import {
	addPointToPlayerThunk,
	createQuizRoomThunk,
	getQuizRoomsThunk,
	managePlayersThunk,
} from '../thunks';
import {
	onAddScoreToPlayer,
	onCreateQuizRoom,
	onPlayerJoinOrLeftInRoom,
} from '../reducers/rootSlice';

export const useQuizRoom = () => {
	const dispatch = useAppDispatch();
	const quizRooms = useAppSelector(getQuizRoomState);
	const quizRoomIds = useAppSelector(getQuizRoomIds);
	const quizRoomByIds = useAppSelector(getQuizRoomByIds);

	const createQuizRoom = useCallback(
		(payload: CreateQuizRoomRequest) => {
			dispatch(createQuizRoomThunk(payload));
		},
		[dispatch]
	);

	const getQuizRooms = useCallback(
		() => dispatch(getQuizRoomsThunk()),
		[dispatch]
	);

	const onQuizRoomCreated = useCallback(
		(payload: OnCreateQuizRoomMessage) => {
			dispatch(onCreateQuizRoom(payload));
		},
		[dispatch]
	);

	const onPlayerJoinOrLeftInQuizRoom = useCallback(
		(payload: OnPlayerJoinOrLeftInRoomMessage) => {
			dispatch(onPlayerJoinOrLeftInRoom(payload));
		},
		[dispatch]
	);

	const managePlayers = useCallback(
		(payload: ManagePlayersRequest) => {
			dispatch(managePlayersThunk(payload));
		},
		[dispatch]
	);

	const addPointToPlayer = useCallback(
		(payload: AddPointToPlayerRequest) => {
			dispatch(addPointToPlayerThunk(payload));
		},
		[dispatch]
	);

	const onAddScorePointToPlayer = useCallback(
		(payload: OnAddPlayerScoreMessage) => {
			dispatch(onAddScoreToPlayer(payload));
		},
		[dispatch]
	);

	return {
		quizRooms,
		quizRoomByIds,
		quizRoomIds,
		createQuizRoom,
		getQuizRooms,
		onQuizRoomCreated,
		managePlayers,
		onPlayerJoinOrLeftInQuizRoom,
		addPointToPlayer,
		onAddScorePointToPlayer,
	};
};
