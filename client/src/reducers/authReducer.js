import { ACTION_TYPE } from '../actions';

const initialState = {
	isAuthenticated: false,
	user: null,
	loading: true,
	notification: null,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGIN:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				notification: null,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				notification: null,
			};
		case ACTION_TYPE.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case ACTION_TYPE.SET_NOTIFICATION:
			return {
				...state,
				notification: action.payload,
			};
		default:
			return state;
	}
};
