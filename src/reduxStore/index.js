import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { optionsLogger, optionsPersist } from '@utils';
import configs from '@configs';
import { RESET } from '@reduxStore/types';

// reducers
import {
  commonReducer,
  authReducer,
  configReducer,
  dashboardReducer,
  organizationReducer,
  projectReducer,
  roleReducer,
  permissionReducer,
  userReducer,
  userOnlineReducer,
  userSessionReducer,
  notifyReducer,
  notifyUserReducer,
  notifyTemplateReducer
} from '@reduxStore/reducers';

// middleware
const loggerMiddleware = createLogger(optionsLogger);

const appReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  config: configReducer,
  dashboard: dashboardReducer,
  organization: organizationReducer,
  project: projectReducer,
  role: roleReducer,
  permission: permissionReducer,
  user: userReducer,
  userOnline: userOnlineReducer,
  userSession: userSessionReducer,
  notify: notifyReducer,
  notifyUser: notifyUserReducer,
  notifyTemplate: notifyTemplateReducer
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

const middleware = [thunkMiddleware, loggerMiddleware];

// configs.nodeEnv !== 'production' && middleware.push(loggerMiddleware);

const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: configs.nodeEnv !== 'production'
});

export default reduxStore;

export const persistedStore = persistStore(reduxStore);
