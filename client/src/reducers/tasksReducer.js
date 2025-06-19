import { ACTION_TYPE } from '../actions';

const initialState = {
	list: [],
	current: null,
};

export const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_TASKS:
			return { ...state, list: action.payload };
		case ACTION_TYPE.SET_TASK:
			return { ...state, current: action.payload };
		case ACTION_TYPE.ADD_TASK:
			return { ...state, list: [...state.list, action.payload] };
		case ACTION_TYPE.UPDATE_TASK:
			return {
				...state,
				list: state.list.map((task) =>
					task.id === action.payload.id ? action.payload : task,
				),
			};
		case ACTION_TYPE.DELETE_TASK:
			return {
				...state,
				list: state.list.filter((task) => task.id !== action.payload),
			};
		case ACTION_TYPE.RESET_TASKS:
			return initialState;
		default:
			return state;
	}
};
