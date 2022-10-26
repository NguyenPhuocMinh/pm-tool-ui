import { DashboardResource } from '@resources';

import FindReplaceIcon from '@mui/icons-material/FindReplace';

const routes = [
  {
    name: 'dashboard',
    path: 'dashboard',
    title: 'Dashboard',
    element: () => <DashboardResource />,
    icon: <FindReplaceIcon />
  }
];

export { routes };
