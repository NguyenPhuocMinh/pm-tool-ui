import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import { get } from 'lodash';
import { checkAuthorization } from '@utils';

const PrivateRouteCommon = ({ children, enable, routePermission }) => {
  const auth = useAuth();
  const location = useLocation();

  const { whoami } = auth;

  const userIsAdmin = get(whoami, 'isAdmin', false);
  const userPermissions = get(whoami, 'permissions', []);

  if (userIsAdmin) {
    return children;
  }

  if (enable && !checkAuthorization(userPermissions, routePermission)) {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouteCommon;
