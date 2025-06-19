import { ACTION_TYPE } from './action-type.js';

export const setProjects = (projects) => ({
	type: ACTION_TYPE.SET_PROJECTS,
	payload: projects,
});

export const setProject = (project) => ({
	type: ACTION_TYPE.SET_PROJECT,
	payload: project,
});

export const addProject = (project) => ({
	type: ACTION_TYPE.ADD_PROJECT,
	payload: project,
});

export const updateProject = (project) => ({
	type: ACTION_TYPE.UPDATE_PROJECT,
	payload: project,
});

export const deleteProject = (id) => ({
	type: ACTION_TYPE.DELETE_PROJECT,
	payload: id,
});

export const resetProjects = () => ({
	type: ACTION_TYPE.RESET_PROJECTS,
});
