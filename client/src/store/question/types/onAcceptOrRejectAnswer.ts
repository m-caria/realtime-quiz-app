import { PayloadAction } from '@reduxjs/toolkit';
import { OnAcceptOrRejectAnswerMessage } from '../../../types';

export enum OnAcceptOrRejectAnswerActionsType {
	RECEIVED = 'RECEIVED/ON_ACCEPT_OR_REJECT_ANSWER',
}

export type OnAcceptOrRejectAnswerReceivedAction = PayloadAction<
	OnAcceptOrRejectAnswerMessage,
	OnAcceptOrRejectAnswerActionsType.RECEIVED
>;

export type OnAcceptOrRejectAnswerActions =
	OnAcceptOrRejectAnswerReceivedAction;
