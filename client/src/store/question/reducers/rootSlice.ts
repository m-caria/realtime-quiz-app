import { createSlice } from '@reduxjs/toolkit';
import { DomainStatus } from '../../types';
import {
	OnAcceptOrRejectAnswerActionsType,
	OnAnswerActionsType,
	OnQuestionCreatedActionsType,
	OnStopTimerActionsType,
	OnTimerExpiredActionsType,
	OnTimerUpdateActionsType,
	QuestionState,
} from '../types';
import * as onQuestionCreatedCases from './onQuestionCreated';
import * as onAnswerCases from './onAnswer';
import * as onTimerUpdateCases from './onTimerUpdate';
import * as onStopTimerCases from './onTimerStopped';
import * as onValidAnswerCases from './onAcceptOrRejectAnswer';
import * as onTimerExpiredCases from './onTimerExpired';
import {
	OnAnswerMessage,
	OnQuestionCreatedMessage,
	OnTimerStoppedMessage,
	OnTimerUpdateMessage,
	OnAcceptOrRejectAnswerMessage,
	OnTimerExpiredMessage,
} from '../../../types';

const initialState: QuestionState = {
	data: {},
	errors: null,
	rollbackData: undefined,
	status: DomainStatus.IDLE,
};

const questionSlice = createSlice({
	name: 'QUESTION',
	initialState,
	reducers: {
		onEnterRoom: (state, action) => ({
			...state,
			data: { ...state.data, [action.payload]: { byId: {}, ids: [] } },
		}),
		onTimerUpdated: (state, action) =>
			onTimerUpdateCases.onTimerUpdateReceivedCase(state, {
				payload: action.payload as OnTimerUpdateMessage,
				type: OnTimerUpdateActionsType.RECEIVED,
			}),
		onTimerStopped: (state, action) =>
			onStopTimerCases.onTimerStoppedReceivedCase(state, {
				payload: action.payload as OnTimerStoppedMessage,
				type: OnStopTimerActionsType.RECEIVED,
			}),
		onTimerExpired: (state, action) =>
			onTimerExpiredCases.onTimerExpiredCase(state, {
				payload: action.payload as OnTimerExpiredMessage,
				type: OnTimerExpiredActionsType.RECEIVED,
			}),
		onQuestionCreated: (state, action) =>
			onQuestionCreatedCases.onQuestionCreatedReceivedCase(state, {
				payload: action.payload as OnQuestionCreatedMessage,
				type: OnQuestionCreatedActionsType.RECEIVED,
			}),
		onAnswer: (state, action) =>
			onAnswerCases.onAnswerReceivedCase(state, {
				payload: action.payload as OnAnswerMessage,
				type: OnAnswerActionsType.RECEIVED,
			}),
		onAcceptOrRejectAnswer: (state, action) =>
			onValidAnswerCases.onValidAnswerReceivedCase(state, {
				payload: action.payload as OnAcceptOrRejectAnswerMessage,
				type: OnAcceptOrRejectAnswerActionsType.RECEIVED,
			}),
	},
});

export const {
	onQuestionCreated,
	onAnswer,
	onEnterRoom,
	onTimerUpdated,
	onTimerStopped,
	onTimerExpired,
	onAcceptOrRejectAnswer,
} = questionSlice.actions;
export default questionSlice.reducer;
