import { APIError } from '../types';

export const isApiErrorType = <T>(value: T | APIError): value is APIError => {
	if ((value as APIError).statusCode) return true;
	return false;
};
