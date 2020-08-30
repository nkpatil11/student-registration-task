import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

// PUSHING ALL MIDDLEWARES BEFORE LOGGER
let middleWares: any[] = [];
middleWares = [...middleWares, thunk];

// SHOW LOGS ONLY IN DEVELOPMENT MODE
const logger = createLogger({
	predicate: () => process.env.NODE_ENV === 'development',
});
middleWares = [...middleWares, logger];

// CREATE STORE
const store = createStore(
	rootReducer,
	{},
	composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
