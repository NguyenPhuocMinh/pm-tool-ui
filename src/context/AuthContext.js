import { createContext } from 'react';

const defaultAuthProvider = {
  token: null,
  payload: null
};

const AuthContext = createContext(defaultAuthProvider);

export { AuthContext };
