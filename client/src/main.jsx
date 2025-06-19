import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { AuthProvider } from './AuthProvider.jsx';
import { Notification } from './Notification.jsx';
import { App } from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<AuthProvider>
				<Notification />
				<App />
			</AuthProvider>
		</BrowserRouter>
	</Provider>,
);
