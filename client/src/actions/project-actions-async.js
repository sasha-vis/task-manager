import { api } from '../api.js';
import {
	setProjects,
	setProject,
	addProject,
	updateProject,
	deleteProject,
} from './project-actions.js';
import { setLoading, setModal, setNotification } from './app-actions.js';

export const getProjectsAsync = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.get('/projects');
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(setProjects(response.data.data));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const getProjectAsync = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.get(`projects/${id}`);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			dispatch(setProject(null));
			return;
		}
		dispatch(setProject(response.data.data));
	} catch (error) {
		dispatch(setProject(null));
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const createProjectAsync = (data) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.post('/projects', data);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(addProject(response.data.data));
		dispatch(setModal(null));
		dispatch(setNotification({ type: 'success', message: 'Проект создан' }));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const updateProjectAsync = (id, data) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.put(`/projects/${id}`, data);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(setProject(response.data.data));
		dispatch(updateProject(response.data.data));
		dispatch(setNotification({ type: 'success', message: 'Проект обновлен' }));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setLoading(false));
	}
};

export const deleteProjectAsync = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const response = await api.delete(`/projects/${id}`);
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return { success: false };
		}
		dispatch(setProject(null));
		dispatch(setModal(null));
		dispatch(deleteProject(id));
		dispatch(setNotification({ type: 'success', message: 'Проект удален' }));
		return { success: true };
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
		return { success: false };
	} finally {
		dispatch(setLoading(false));
	}
};
