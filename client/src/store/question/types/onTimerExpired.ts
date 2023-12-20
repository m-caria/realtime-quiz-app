import { PayloadAction } from '@reduxjs/toolkit';
import { OnTimerExpiredMessage } from '../../../types';

export enum OnTimerExpiredActionsType {
	RECEIVED = 'RECEIVED/ON_TIMER_EXPIRED',
}

export type OnTimerExpiredReceivedAction = PayloadAction<
	OnTimerExpiredMessage,
	OnTimerExpiredActionsType.RECEIVED
>;

export type OnTimerExpiredActions = OnTimerExpiredReceivedAction;
