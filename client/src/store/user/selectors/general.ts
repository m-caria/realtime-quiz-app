import { RootState } from '../../store';

export const getApplicationUserState = (state: RootState) =>
	state.applicationUser;
