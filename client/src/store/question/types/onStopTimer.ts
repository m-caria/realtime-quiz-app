import { PayloadAction } from '@reduxjs/toolkit';
import { OnTimerStoppedMessage } from '../../../types';

export enum OnStopTimerActionsType {
	RECEIVED = 'RECEIVED/ON_TIMER_STOP',
}

export type OnStopTimerReceivedAction = PayloadAction<
	OnTimerStoppedMessage,
	OnStopTimerActionsType.RECEIVED
>;

export type OnStopTimerActions = OnStopTimerReceivedAction;
