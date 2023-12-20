import { useEffect } from 'react';
import { DomainStatus, useApplicationUser, useQuizRoom } from '../store';
import { UserResponse } from '../types';

export const usePreloader = () => {
	const { applicationUser, getUser } = useApplicationUser();
	const { quizRooms, getQuizRooms } = useQuizRoom();

	useEffect(() => {
		const sessionUser = window.sessionStorage.getItem('user');
		if (sessionUser) {
			const user = JSON.parse(sessionUser) as UserResponse;
			if (
				applicationUser.status !== DomainStatus.LOADED &&
				applicationUser.status !== DomainStatus.LOADING
			) {
				getUser({ username: user.username });
			}

			if (
				quizRooms.status !== DomainStatus.LOADING &&
				quizRooms.status !== DomainStatus.LOADED
			) {
				getQuizRooms();
			}
		}
	}, [getUser, getQuizRooms, applicationUser.status, quizRooms.status]);
};
