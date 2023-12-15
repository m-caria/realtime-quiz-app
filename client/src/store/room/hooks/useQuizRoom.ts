import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
	getQuizRoomByIds,
	getQuizRoomIds,
	getQuizRoomState,
} from '../selectors';
import { CreateQuizRoomRequest } from '../../../types';
import { createQuizRoomThunk, getQuizRoomsThunk } from '../thunks';

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

	return {
		quizRooms,
		quizRoomByIds,
		quizRoomIds,
		createQuizRoom,
		getQuizRooms,
	};
};
