import { api } from '../utils/index.js';
import { loginUser, logoutUser, setLoading } from './auth-actions.js';

export const checkAuthAsync = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.get('/api/auth/me');

		const { data, error } = response.data;
		if (error || !data) {
			throw new Error(error || 'Ошибка аутентификации');
		}

		dispatch(loginUser(data));
	} catch {
		dispatch(logoutUser());
	} finally {
		dispatch(setLoading(false));
	}
};

export const loginUserAsync = (credentials) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post('/api/auth/login', credentials);

		const { data, error } = response.data;
		if (error || !data) {
			throw new Error(error || 'Ошибка авторизации');
		}

		dispatch(loginUser(data));
	} catch (error) {
		console.error('Ошибка проверки авторизации:', error.message);
	} finally {
		dispatch(setLoading(false));
	}
};

export const registerUserAsync = (credentials) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post('/api/auth/register', credentials);

		const { data, error } = response.data;
		if (error || !data) {
			throw new Error(error || 'Ошибка регистрации');
		}

		dispatch(loginUser(data));
	} catch (error) {
		console.error('Ошибка проверки авторизации:', error.message);
	} finally {
		dispatch(setLoading(false));
	}
};

export const logoutUserAsync = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		await api.post('/api/auth/logout');
		dispatch(logoutUser());
	} catch (error) {
		console.error('Ошибка выхода:', error.message);
		dispatch(logoutUser());
	} finally {
		dispatch(setLoading(false));
	}
};
