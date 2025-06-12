import { ACTION_TYPE } from '../actions';

const initialState = {
	isAuthenticated: false,
	user: null,
	loading: true,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGIN:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		case ACTION_TYPE.SET_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};
