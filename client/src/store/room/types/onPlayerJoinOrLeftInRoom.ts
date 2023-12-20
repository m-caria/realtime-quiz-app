import { PayloadAction } from '@reduxjs/toolkit';
import { OnPlayerJoinOrLeftInRoomMessage } from '../../../types';

export enum OnPlayerJoinOrLeftInRoomActionsType {
	RECEIVED = 'RECEIVED/ON_PLAYER_JOIN_OR_LEFT_IN_ROOM',
}

export type OnPlayerJoinOrLeftInRoomReceivedAction = PayloadAction<
	OnPlayerJoinOrLeftInRoomMessage,
	OnPlayerJoinOrLeftInRoomActionsType.RECEIVED
>;

export type OnPlayerJoinOrLeftInRoomActions =
	OnPlayerJoinOrLeftInRoomReceivedAction;
