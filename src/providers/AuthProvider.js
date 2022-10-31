import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '@context';
import { get } from 'lodash';

const AuthProvider = ({ children }) => {
  const { auth } = useSelector((state) => {
    return {
      auth: get(state, 'auth')
    };
  });

  const authProvider = useMemo(() => {
    return {
      token: 'token'
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={authProvider}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
