import { api } from '../api.js';
import { setUser } from './user-actions.js';
import { setAuthChecking, setNotification, setAuthentication } from './app-actions.js';

export const checkAuthAsync = () => async (dispatch) => {
	try {
		const response = await api.get('/auth/me');
		if (response.data.error) {
			dispatch(
				setNotification({
					type: 'error',
					message: response.data.error,
				}),
			);
			return;
		}
		dispatch(setAuthentication(true));
		dispatch(setUser(response.data.data));
	} catch (error) {
		dispatch(setNotification({ type: 'error', message: error.message }));
	} finally {
		dispatch(setAuthChecking(false));
	}
};
