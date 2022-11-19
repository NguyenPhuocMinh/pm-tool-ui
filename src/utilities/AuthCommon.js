import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import { isEmpty } from 'lodash';

const AuthCommon = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  const { token, payload } = auth;

  if (isEmpty(token) && isEmpty(payload)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthCommon;
