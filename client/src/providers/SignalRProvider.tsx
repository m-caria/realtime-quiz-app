import { ReactNode } from 'react';
import { SignalRContext } from '../contexts';
import { HttpTransportType } from '@microsoft/signalr';

type Props = {
	children: ReactNode;
};

const SignalRProvider: React.FC<Props> = ({ children }) => (
	<SignalRContext.Provider
		connectEnabled
		url="https://localhost:7064/quiz-hub"
		automaticReconnect
		withCredentials={false}
		skipNegotiation
		transport={HttpTransportType.WebSockets}
	>
		{children}
	</SignalRContext.Provider>
);
export default SignalRProvider;
