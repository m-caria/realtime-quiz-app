export type APIError = {
	statusCode: number;
	detail: string;
	internalCode: string;
	message: string;
	endpoint: string;
};
