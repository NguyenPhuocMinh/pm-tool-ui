import { createContext } from 'react';

const defaultAuthProvider = {
  isAuthenticated: false,
  token: null
};

const AuthContext = createContext(defaultAuthProvider);

export { AuthContext };
