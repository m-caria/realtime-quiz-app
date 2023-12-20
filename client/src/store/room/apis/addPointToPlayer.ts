import {
	APIError,
	AddPointToPlayerRequest,
	QuizRoomScoreResponse,
} from '../../../types';
import { post } from '../../api';

export const addPointToPlayerApi = async (
	payload: AddPointToPlayerRequest
): Promise<QuizRoomScoreResponse | APIError> =>
	await post<AddPointToPlayerRequest, QuizRoomScoreResponse>(
		`/api/scores/${payload.roomId}`,
		payload
	);
