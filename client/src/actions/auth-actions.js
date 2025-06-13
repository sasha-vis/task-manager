import { ACTION_TYPE } from './action-type';

export const loginUser = (user) => ({
	type: ACTION_TYPE.LOGIN,
	payload: user,
});

export const logoutUser = () => ({
	type: ACTION_TYPE.LOGOUT,
});

export const setLoading = (loading) => ({
	type: ACTION_TYPE.SET_LOADING,
	payload: loading,
});

export const setNotification = (notification) => ({
	type: ACTION_TYPE.SET_NOTIFICATION,
	payload: notification,
});
