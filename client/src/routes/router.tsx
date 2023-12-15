import { createBrowserRouter } from 'react-router-dom';
import { HomePage, PreConnectPage, QuizRoomPage } from '../pages';

export const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/pre-connect', element: <PreConnectPage /> },
	{ path: '/quiz-room/:roomId', element: <QuizRoomPage /> },
]);
