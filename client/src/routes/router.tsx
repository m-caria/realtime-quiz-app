import { createBrowserRouter } from 'react-router-dom';
import { HomePage, QuizRoomPage } from '../pages';

export const router = createBrowserRouter([
	{ path: '/', element: <HomePage /> },
	{ path: '/quiz-room/:roomId', element: <QuizRoomPage /> },
]);
