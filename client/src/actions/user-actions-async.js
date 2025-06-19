import { api } from '../api.js';
import { setUser, updateUser } from './user-actions.js';
import {
	setAuthentication,
	setLoading,
	setNotification,
	setModal,
} from './app-actions.js';
import { resetProjects } from './project-actions.js';
import { resetTasks } from './task-actions.js';

export const loginUserAsync = (credentials) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post('/auth/login', credentials);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(setUser(response.data.data));
		dispatch(setAuthentication(true));
		dispatch(setNotification({ type: 'success', message: 'Вход выполнен успешно' }));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const registerUserAsync = (credentials) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post('/auth/register', credentials);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(setUser(response.data.data));
		dispatch(setAuthentication(true));
		dispatch(setNotification({ type: 'success', message: 'Регистрация успешна' }));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const logoutUserAsync = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post('/auth/logout');
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(resetTasks());
		dispatch(resetProjects());
		dispatch(setUser(null));
		dispatch(setAuthentication(false));
		dispatch(setModal(null));
		dispatch(setNotification({ type: 'success', message: 'Выход выполнен успешно' }));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const updateUserAsync = (id, data) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.put(`/users/${id}`, data);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(updateUser(response.data.data));
		dispatch(setNotification({ type: 'success', message: 'Пользователь обновлен' }));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};
