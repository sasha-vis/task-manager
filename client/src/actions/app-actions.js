import { ACTION_TYPE } from './action-type.js';

export const setLoading = (isLoading) => ({
	type: ACTION_TYPE.SET_LOADING,
	payload: isLoading,
});

export const setNotification = (notification) => ({
	type: ACTION_TYPE.SET_NOTIFICATION,
	payload: notification,
});

export const setModal = (modal) => ({
	type: ACTION_TYPE.SET_MODAL,
	payload: modal,
});

export const setAuthentication = (isAuthenticated) => ({
	type: ACTION_TYPE.SET_AUTHENTICATION,
	payload: isAuthenticated,
});

export const setAuthChecking = (isAuthChecking) => ({
	type: ACTION_TYPE.SET_AUTH_CHECKING,
	payload: isAuthChecking,
});
