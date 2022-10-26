import { useMemo } from 'react';
import { AuthContext } from '@context';

const AuthProvider = ({ children }) => {
  const authProvider = useMemo(() => {
    return {
      token: 'token'
    };
  }, []);

  return (
    <AuthContext.Provider value={authProvider}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
