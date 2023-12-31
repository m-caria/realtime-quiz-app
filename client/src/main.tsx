import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './store';
import { SignalRProvider } from './providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SignalRProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</SignalRProvider>
	</React.StrictMode>
);
