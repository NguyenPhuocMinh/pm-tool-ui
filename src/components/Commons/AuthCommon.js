import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import { isEmpty } from 'lodash';

const AuthCommon = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  const { isAuthenticated, token } = auth;

  if (!isAuthenticated && isEmpty(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthCommon;
