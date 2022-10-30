import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { optionsLogger, optionsPersist } from '@utils';
import { RESET } from './types';

// reducers
import { commonReducer, authReducer } from './reducers';

// middleware
const loggerMiddleware = createLogger(optionsLogger);

const appReducer = combineReducers({
  common: commonReducer,
  auth: authReducer
});

const rootReducer = (state, action) => {
  const { type } = action;
  // reset all state
  if (type === RESET) {
    return appReducer({}, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(optionsPersist, rootReducer);

const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware, loggerMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
});

export default reduxStore;

export const persistedStore = persistStore(reduxStore);
