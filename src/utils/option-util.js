import storage from 'redux-persist/lib/storage';

export const optionDevTools = {
  trace: true,
  traceLimit: 25
};

export const optionsLogger = {
  level: 'info',
  collapsed: true,
  diff: true
};

export const optionsPersist = {
  key: 'root',
  storage
};
