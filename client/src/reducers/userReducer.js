import { ACTION_TYPE } from '../actions';

const initialState = {
	data: null,
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				data: action.payload,
			};
		case ACTION_TYPE.UPDATE_USER:
			return {
				...state,
				data: action.payload,
			};
		default:
			return state;
	}
};
