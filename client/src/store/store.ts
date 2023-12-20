import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { applicationUserSlice } from './user';
import { quizRoomSlice } from './room';
import { questionSlice } from './question';

const appReducers = combineReducers({
	applicationUser: applicationUserSlice,
	quizRooms: quizRoomSlice,
	questions: questionSlice,
});

export const store = configureStore({
	reducer: appReducers,
	devTools: true,
});

export type RootState = ReturnType<typeof appReducers>;
export type AppDispatch = typeof store.dispatch;
