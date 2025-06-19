import { ACTION_TYPE } from './action-type.js';

export const setTasks = (tasks) => ({
	type: ACTION_TYPE.SET_TASKS,
	payload: tasks,
});

export const setTask = (task) => ({
	type: ACTION_TYPE.SET_TASK,
	payload: task,
});

export const addTask = (task) => ({
	type: ACTION_TYPE.ADD_TASK,
	payload: task,
});

export const updateTask = (task) => ({
	type: ACTION_TYPE.UPDATE_TASK,
	payload: task,
});

export const deleteTask = (id) => ({
	type: ACTION_TYPE.DELETE_TASK,
	payload: id,
});

export const resetTasks = () => ({
	type: ACTION_TYPE.RESET_TASKS,
});
