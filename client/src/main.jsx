import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, Notification } from './components';
import { App } from './App.jsx';
import { store } from './store.js';
import './index.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<AuthProvider>
				<Notification />
				<App />
			</AuthProvider>
		</Provider>
	</BrowserRouter>,
);
