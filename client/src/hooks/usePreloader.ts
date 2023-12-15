import { useEffect } from 'react';
import { useApplicationUser, useQuizRoom } from '../store';
import { UserResponse } from '../types';

export const usePreloader = () => {
	const { getUser } = useApplicationUser();
	const { getQuizRooms } = useQuizRoom();

	useEffect(() => {
		const sessionUser = window.sessionStorage.getItem('user');
		if (sessionUser) {
			const user = JSON.parse(sessionUser) as UserResponse;
			getUser({ username: user.username });
			getQuizRooms();
		}
	}, [getUser, getQuizRooms]);
};
