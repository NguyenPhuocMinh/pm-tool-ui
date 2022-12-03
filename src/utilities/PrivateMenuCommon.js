import { useAuth } from '@hooks';
import { get } from 'lodash';
import { checkAuthorization } from '@utils';

const PrivateMenuCommon = ({ children, enable, menuPermission }) => {
  const auth = useAuth();

  const { whoami } = auth;

  const userIsAdmin = get(whoami, 'isAdmin', false);
  const userPermissions = get(whoami, 'permissions', []);

  if (userIsAdmin) {
    return children;
  }

  if (enable && !checkAuthorization(userPermissions, menuPermission)) {
    return null;
  }

  return children;
};

export default PrivateMenuCommon;
