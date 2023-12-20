import { PayloadAction } from '@reduxjs/toolkit';
import { OnCreateQuizRoomMessage } from '../../../types';

export enum OnCreateQuizRoomActionsType {
	RECEIVED = 'RECEIVED/ON_CREATE_QUIZ_ROOM',
}

export type OnCreateQuizRoomReceivedAction = PayloadAction<
	OnCreateQuizRoomMessage,
	OnCreateQuizRoomActionsType.RECEIVED
>;

export type OnCreateQuizRoomActions = OnCreateQuizRoomReceivedAction;
