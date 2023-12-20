import { PayloadAction } from '@reduxjs/toolkit';
import { OnTimerUpdateMessage } from '../../../types';

export enum OnTimerUpdateActionsType {
	RECEIVED = 'RECEIVED/ON_TIMER_UPDATE',
}

export type OnTimerUpdateReceivedAction = PayloadAction<
	OnTimerUpdateMessage,
	OnTimerUpdateActionsType.RECEIVED
>;

export type OnTimerUpdateActions = OnTimerUpdateReceivedAction;
