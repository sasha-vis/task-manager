import { api } from '../utils';
import { loginUser, logoutUser, setLoading, setNotification } from './auth-actions';

export const checkAuthAsync = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.get('/auth/me');
		const { data, error } = response.data;

		if (error || !data) {
			dispatch(
				setNotification({
					type: 'error',
					message: error || 'Ошибка аутентификации',
				}),
			);
			return dispatch(logoutUser());
		}
		dispatch(loginUser(data));
	} catch (error) {
		console.error('Ошибка проверки аутентификации:', error.message);
		dispatch(
			setNotification({ type: 'error', message: 'Ошибка проверки аутентификации' }),
		);
		dispatch(logoutUser());
	} finally {
		dispatch(setLoading(false));
	}
};

export const loginUserAsync = (credentials) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post('/auth/login', credentials);
		const { data, error } = response.data;

		if (error || !data) {
			dispatch(
				setNotification({
					type: 'error',
					message: error || 'Ошибка авторизации',
				}),
			);
			return { success: false };
		}
		dispatch(loginUser(data));
		dispatch(setNotification({ type: 'success', message: 'Вход выполнен успешно' }));
		return { success: true };
	} finally {
		dispatch(setLoading(false));
	}
};

export const registerUserAsync = (credentials) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post('/auth/register', credentials);
		const { data, error } = response.data;

		if (error || !data) {
			dispatch(
				setNotification({
					type: 'error',
					message: error || 'Ошибка регистрации',
				}),
			);
			return { success: false };
		}
		dispatch(loginUser(data));
		dispatch(setNotification({ type: 'success', message: 'Регистрация успешна' }));
		return { success: true };
	} finally {
		dispatch(setLoading(false));
	}
};

export const logoutUserAsync = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		await api.post('/auth/logout');

		dispatch(logoutUser());
		dispatch(setNotification({ type: 'success', message: 'Выход выполнен успешно' }));
	} catch (error) {
		console.error('Ошибка выхода:', error.message);
		dispatch(setNotification({ type: 'error', message: 'Ошибка выхода' }));
		dispatch(logoutUser());
	} finally {
		dispatch(setLoading(false));
	}
};
