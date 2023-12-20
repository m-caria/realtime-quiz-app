import {
	faPaperPlane,
	faPlusCircle,
	faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Input, Modal } from '../../../../components';
import { QuizRoomResponse } from '../../../../types';
import { Fragment, useContext, useState } from 'react';
import TextArea from '../../../../components/atoms/text-area';
import { QuizRoomMessageContext } from '../../../../contexts';

type Props = {
	username: string;
	room: QuizRoomResponse;
	bookAnswerUser?: string;
	setIsOwnerThinking: (isThinking: boolean) => void;
};

const RoomInput: React.FC<Props> = ({
	room,
	username,
	bookAnswerUser,
	setIsOwnerThinking,
}) => {
	const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
	const {
		currentQuestion,
		questionsById,
		question,
		answer,
		onOwnerTyping,
		setAnswer,
		sendAnswer,
		setQuestion,
		onPublishQuestion,
	} = useContext(QuizRoomMessageContext);

	return (
		<Fragment>
			<div className="col-start-3 col-end-13 row-start-6 row-end-auto flex mb-2 items-end mr-4">
				{room.ownerName === username ? (
					<Button
						text="Crea una domanda"
						variant="primary"
						className="w-full font-secondary"
						icon={faPlusCircle}
						iconPosition="right"
						disabled={
							!!currentQuestion && questionsById[currentQuestion].countdown > 0
						}
						onClick={() => {
							setIsCreatingQuestion(true);
							onOwnerTyping && onOwnerTyping(true);
						}}
					/>
				) : (
					<div className="flex items-center gap-2 w-full">
						<Input
							disabled={bookAnswerUser !== username}
							placeholder="Rispondi alla domanda..."
							icon={faPaperPlane}
							onChange={(event) => setAnswer && setAnswer(event.target.value)}
							value={answer}
							onKeyDown={(event) => {
								if (event.key === 'Enter' && currentQuestion) {
									sendAnswer && sendAnswer(username, currentQuestion);
									setIsOwnerThinking(true);
									setAnswer && setAnswer('');
								}
							}}
						/>
						<Button
							text="Invia"
							variant="primary"
							className="font-secondary"
							icon={faPaperPlane}
							iconPosition="right"
							onClick={() => {
								if (currentQuestion) {
									sendAnswer && sendAnswer(username, currentQuestion);
									setIsOwnerThinking(true);
								}
							}}
						/>
					</div>
				)}
			</div>
			<Modal
				isOpened={isCreatingQuestion}
				modalSize="large"
				title="Crea una domanda"
				onClose={() => {
					setIsCreatingQuestion(false);
					onOwnerTyping && onOwnerTyping(false);
				}}
				className="font-secondary"
			>
				<TextArea
					size={3}
					placeholder="Scrivi la domanda..."
					icon={faQuestion}
					onChange={(event) => setQuestion && setQuestion(event.target.value)}
				/>
				<Button
					variant="secondary"
					text="Pubblica"
					icon={faPaperPlane}
					iconPosition="right"
					disabled={question.length === 0}
					onClick={() => {
						onPublishQuestion && onPublishQuestion();
						setIsCreatingQuestion(false);
					}}
				/>
			</Modal>
		</Fragment>
	);
};

export default RoomInput;
