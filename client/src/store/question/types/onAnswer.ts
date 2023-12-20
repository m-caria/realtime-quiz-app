import { PayloadAction } from '@reduxjs/toolkit';
import { OnAnswerMessage } from '../../../types';

export enum OnAnswerActionsType {
	RECEIVED = 'RECEIVED/ON_ANSWER',
}

export type OnAnswerReceivedAction = PayloadAction<
	OnAnswerMessage,
	OnAnswerActionsType.RECEIVED
>;

export type OnAnswerActions = OnAnswerReceivedAction;
