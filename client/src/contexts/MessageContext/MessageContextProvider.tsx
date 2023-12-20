import React from 'react';
import { ReactElement } from 'react';
import { QuizRoomMessageContext } from './MessageContext';
import { useMessages } from '../../hooks';

type Props = {
	roomId: string;
	children: ReactElement | ReactElement[];
};

const MessageContextProvider: React.FC<Props> = ({ children, roomId }) => {
	const {
		currentQuestion,
		isOwnerTyping,
		onCreatedAnswer,
		questionsById,
		questionsIds,
		onAcceptAnswer,
		onRejectAnswer,
		question,
		answer,
		onOwnerTyping,
		setQuestion,
		setAnswer,
		sendAnswer,
		onPublishQuestion,
		isTimerExpiredModalOpened,
		setIsTimerExpiredModalOpened,
	} = useMessages(roomId);

	return (
		<QuizRoomMessageContext.Provider
			value={{
				currentQuestion,
				isOwnerTyping,
				answer,
				onCreatedAnswer,
				questionsById,
				questionsIds,
				onAcceptAnswer,
				onRejectAnswer,
				question,
				onOwnerTyping,
				setQuestion,
				setAnswer,
				sendAnswer,
				onPublishQuestion,
				isTimerExpiredModalOpened,
				setIsTimerExpiredModalOpened,
			}}
		>
			{children}
		</QuizRoomMessageContext.Provider>
	);
};

export default MessageContextProvider;
