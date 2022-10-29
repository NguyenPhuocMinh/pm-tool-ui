import { useContext } from 'react';
import { AuthContext } from '@context';

const useRefresh = () => {
  return useContext(AuthContext);
};

export default useRefresh;
