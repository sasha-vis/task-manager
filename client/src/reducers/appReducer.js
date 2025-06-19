import { ACTION_TYPE } from '../actions';

const initialState = {
	isLoading: false,
	notification: null,
	modal: null,
	isAuthenticated: false,
	isAuthChecking: true,
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case ACTION_TYPE.SET_NOTIFICATION:
			return {
				...state,
				notification: action.payload,
			};
		case ACTION_TYPE.SET_MODAL:
			return {
				...state,
				modal: action.payload,
			};
		case ACTION_TYPE.SET_AUTHENTICATION:
			return {
				...state,
				isAuthenticated: action.payload,
			};
		case ACTION_TYPE.SET_AUTH_CHECKING:
			return {
				...state,
				isAuthChecking: action.payload,
			};
		default:
			return state;
	}
};
