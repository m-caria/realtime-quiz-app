import { APIError, UserResponse } from '../../../types';
import { get } from '../../api';

export const getUserApi = async (
	username: string
): Promise<UserResponse | APIError> =>
	await get<UserResponse>(`/api/users/${username}`);
