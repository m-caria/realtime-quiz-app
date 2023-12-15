import { APIError, CreateUserRequest, UserResponse } from '../../../types';
import { post } from '../../api';

export const createUserApi = async (
	payload: CreateUserRequest
): Promise<UserResponse | APIError> =>
	await post<CreateUserRequest, UserResponse>('/api/users', payload);
