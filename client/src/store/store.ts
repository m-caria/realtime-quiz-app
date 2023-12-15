import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { applicationUserSlice } from './user';
import { quizRoomSlice } from './room';

const appReducers = combineReducers({
	applicationUser: applicationUserSlice,
	quizRooms: quizRoomSlice,
});

export const store = configureStore({
	reducer: appReducers,
	devTools: true,
});

export type RootState = ReturnType<typeof appReducers>;
export type AppDispatch = typeof store.dispatch;
