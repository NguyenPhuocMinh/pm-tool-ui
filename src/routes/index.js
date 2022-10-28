import {
  HomeResource,
  DashboardResource,
  OrganizationResource,
  ProjectResource
} from '@resources';

import HomeIcon from '@mui/icons-material/Home';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const routes = [
  {
    name: 'home',
    title: 'Home Page',
    path: '',
    element: () => <HomeResource />,
    icon: <HomeIcon />
  },
  {
    name: 'dashboard',
    title: 'Dashboard',
    path: 'dashboard',
    element: () => <DashboardResource />,
    icon: <FindReplaceIcon />
  },
  {
    name: 'organizations',
    path: 'organizations',
    title: 'Organizations Page',
    element: () => <OrganizationResource />,
    icon: <StarOutlineIcon />
  },
  {
    name: 'project',
    path: 'project',
    title: 'project Page',
    element: () => <ProjectResource />,
    icon: <StarOutlineIcon />
  }
];

export { routes };
