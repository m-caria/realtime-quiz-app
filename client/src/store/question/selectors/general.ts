import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const getQuestionState = (state: RootState) => state.questions;

export const getCurrentQuestion = (roomId: string) =>
	createSelector(getQuestionState, (state) =>
		state.data[roomId] ? state.data[roomId].currentQuestion : ''
	);

export const getQuestionIds = (roomId: string) =>
	createSelector(getQuestionState, (state) =>
		state.data[roomId] ? state.data[roomId].ids : []
	);

export const getQuestionById = (roomId: string) =>
	createSelector(getQuestionState, (state) =>
		state.data[roomId] ? state.data[roomId].byId : {}
	);
