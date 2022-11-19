import { useAuth } from '@hooks';
import { get } from 'lodash';
import { checkSubMenuPer } from '@utils';

const PrivateSubMenuCommon = ({ children, subPermissions }) => {
  const auth = useAuth();

  const { payload } = auth;

  const userIsAdmin = get(payload, 'isAdmin', false);
  const userPermissions = get(payload, 'permissions', []);

  if (userIsAdmin) {
    return children;
  }

  if (!checkSubMenuPer(userPermissions, subPermissions)) {
    return null;
  }

  return children;
};

export default PrivateSubMenuCommon;
