import { useAuth } from '@hooks';
import { get } from 'lodash';
import { checkSubMenuPer } from '@utils';

const PrivateSubMenuCommon = ({ children, subPermissions }) => {
  const auth = useAuth();

  const { whoami } = auth;

  const userIsAdmin = get(whoami, 'isAdmin', false);
  const userPermissions = get(whoami, 'permissions', []);

  if (userIsAdmin) {
    return children;
  }

  if (!checkSubMenuPer(userPermissions, subPermissions)) {
    return null;
  }

  return children;
};

export default PrivateSubMenuCommon;
