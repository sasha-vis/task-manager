import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer, userReducer, projectsReducer, tasksReducer } from './reducers';

const rootReducer = combineReducers({
	app: appReducer,
	user: userReducer,
	projects: projectsReducer,
	tasks: tasksReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
