import { ACTION_TYPE } from './action-type.js';

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
