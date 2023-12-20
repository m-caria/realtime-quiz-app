import { PayloadAction } from '@reduxjs/toolkit';
import { OnAddPlayerScoreMessage } from '../../../types';

export enum OnAddPlayerScoreActionsType {
	RECEIVED = 'RECEIVED/ON_ADD_SCORE_TO_PLAYER',
}

export type OnAddPlayerScoreReceivedAction = PayloadAction<
	OnAddPlayerScoreMessage,
	OnAddPlayerScoreActionsType.RECEIVED
>;

export type OnAddPlayerScoreActions = OnAddPlayerScoreReceivedAction;
