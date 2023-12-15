import {
	APIError,
	CreateQuizRoomRequest,
	QuizRoomResponse,
} from '../../../types';
import { post } from '../../api';

export const createQuizRoomApi = async (
	payload: CreateQuizRoomRequest
): Promise<QuizRoomResponse | APIError> =>
	await post<CreateQuizRoomRequest, QuizRoomResponse>('/api/rooms', payload);
