import { APIError, QuizRoomResponse } from '../../../types';
import { get } from '../../api';

export const getQuizRoomsApi = async (): Promise<
	QuizRoomResponse[] | APIError
> => await get<QuizRoomResponse[]>('/api/rooms');
