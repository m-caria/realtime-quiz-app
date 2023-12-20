import {
	APIError,
	ManagePlayersRequest,
	QuizRoomResponse,
} from '../../../types';
import { post } from '../../api';

export const managePlayersApi = async (
	payload: ManagePlayersRequest
): Promise<QuizRoomResponse | APIError> =>
	await post<ManagePlayersRequest, QuizRoomResponse>(
		`/api/rooms/${payload.roomId}/players`,
		payload
	);
