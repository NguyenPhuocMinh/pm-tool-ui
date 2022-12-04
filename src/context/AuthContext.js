import { createContext } from 'react';

const defaultAuthProvider = {
  token: null,
  whoami: null
};

const AuthContext = createContext(defaultAuthProvider);

export { AuthContext };
