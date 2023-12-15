import { RootState } from '../../store';

export const getQuizRoomState = (state: RootState) => state.quizRooms;

export const getQuizRoomIds = (state: RootState) =>
	getQuizRoomState(state).data.ids;

export const getQuizRoomByIds = (state: RootState) =>
	getQuizRoomState(state).data.byId;
