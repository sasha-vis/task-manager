import { api } from '../api.js';
import { setTasks, setTask, addTask, updateTask, deleteTask } from './task-actions.js';
import { setLoading, setModal, setNotification } from './app-actions.js';

export const getTasksAsync = (projectId) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.get(`/projects/${projectId}/tasks`);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(setTasks(response.data.data));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const getTaskAsync = (projectId, taskId) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.get(`/projects/${projectId}/tasks/${taskId}`);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			dispatch(setTask(null));
			return;
		}
		dispatch(setTask(response.data.data));
	} catch (error) {
		dispatch(setTask(null));
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const createTaskAsync = (projectId, data) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post(`/projects/${projectId}/tasks`, data);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(addTask(response.data.data));
		dispatch(setModal(null));
		dispatch(setNotification({ type: 'success', message: 'Задача создана' }));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const updateTaskAsync = (projectId, taskId, data) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.put(`/projects/${projectId}/tasks/${taskId}`, data);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(setTask(response.data.data));
		dispatch(updateTask(response.data.data));
		dispatch(setNotification({ type: 'success', message: 'Задача обновлена' }));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const deleteTaskAsync = (projectId, taskId) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return { success: false };
		}
		dispatch(setTask(null));
		dispatch(setModal(null));
		dispatch(deleteTask(taskId));
		dispatch(setNotification({ type: 'success', message: 'Задача удалена' }));
		return { success: true };
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
		return { success: false };
	} finally {
		dispatch(setLoading(false));
	}
};
