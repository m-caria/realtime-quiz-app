import { PayloadAction } from '@reduxjs/toolkit';
import { OnQuestionCreatedMessage } from '../../../types';

export enum OnQuestionCreatedActionsType {
	RECEIVED = 'RECEIVED/ON_QUESTION_CREATED',
}

export type OnQuestionCreatedReceivedAction = PayloadAction<
	OnQuestionCreatedMessage,
	OnQuestionCreatedActionsType.RECEIVED
>;

export type OnQuestionCreatedActions = OnQuestionCreatedReceivedAction;
