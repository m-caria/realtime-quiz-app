import { APIError } from '../types';

export enum DomainStatus {
	IDLE = 'IDLE',
	LOADING = 'LOADING',
	LOADED = 'LOADED',
	ERROR = 'ERROR',
}

export type NormalizedModel<T> = {
	ids: string[];
	byId: Record<string, T>;
};

export type DomainState<T> = {
	data: T;
	rollbackData?: T;
	status: DomainStatus;
	errors?: APIError | null;
};
