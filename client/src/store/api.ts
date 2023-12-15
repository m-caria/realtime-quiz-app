import wretch, { WretchOptions } from 'wretch';
import { APIError } from '../types';

const instance = wretch()
	.options({ credentials: 'include', mode: 'cors' })
	.headers({
		'Content-Type': 'application/json',
	});

export const post = <T, R>(
	endpoint: string,
	body: T,
	options: WretchOptions = {}
): Promise<R | APIError> =>
	instance.options(options).post(body, endpoint).json();

export const put = <T, R>(endpoint: string, body: T): Promise<R | APIError> =>
	instance.put(body, endpoint).json();

export const remove = <R>(endpoint: string): Promise<R | APIError> =>
	instance.delete(endpoint).json();

export const get = <R>(
	endpoint: string,
	params?: Record<string, string>
): Promise<R | APIError> =>
	instance.get(`${endpoint}${getQueryParams(params)}`).json();

const getQueryParams = (params?: Record<string, string>): string => {
	if (!params) return '';

	return (
		`?${Object.keys(params)
			.map((key) => `${key}=${params[key]}`)
			.join('&')}` ?? ''
	);
};
