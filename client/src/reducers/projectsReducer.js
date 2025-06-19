import { ACTION_TYPE } from '../actions';

const initialState = {
	list: [],
	current: null,
};

export const projectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECTS:
			return { ...state, list: action.payload };
		case ACTION_TYPE.SET_PROJECT:
			return { ...state, current: action.payload };
		case ACTION_TYPE.ADD_PROJECT:
			return { ...state, list: [...state.list, action.payload] };
		case ACTION_TYPE.UPDATE_PROJECT:
			return {
				...state,
				list: state.list.map((project) =>
					project.id === action.payload.id ? action.payload : project,
				),
			};
		case ACTION_TYPE.DELETE_PROJECT:
			return {
				...state,
				list: state.list.filter((project) => project.id !== action.payload),
			};
		case ACTION_TYPE.RESET_PROJECTS:
			return initialState;
		default:
			return state;
	}
};
