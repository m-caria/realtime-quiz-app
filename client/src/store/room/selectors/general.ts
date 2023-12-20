import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const getQuizRoomState = (state: RootState) => state.quizRooms;

export const getQuizRoomIds = createSelector(
	getQuizRoomState,
	(state) => state.data.ids
);

export const getQuizRoomByIds = createSelector(
	getQuizRoomState,
	(state) => state.data.byId
);
