const translationOrganization = {
  title: {
    list: 'Organization List',
    create: 'Create Organization',
    edit: 'Edit Organization'
  },
  description: {
    list: 'This page are manage organization has been create'
  },
  fields: {
    name: 'Organization Name',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    verify: 'Verify'
  },
  tabs: {
    details: 'Details',
    projectsInOrganization: 'Projects In Organization'
  },
  labels: {
    createProject: 'Create Project'
  },
  search: 'Search by organization...',
  popup: {
    title: 'Delete Organization',
    content:
      'Are you sure you want to permanently delete the organization {{organizationName}}?',
    verifyName: 'Please input organization {{organizationName}}'
  },
  notifications: {
    errors: {
      e001: 'Data Invalid',
      e002: 'Organization Has Duplicate',
      e003: 'ID Not Found',
      e004: 'Please Remove All Member In Team'
    },
    success: {
      s001: 'Get List Organization Success',
      s002: 'Create Organization Success',
      s003: 'Get Organization By Id Success',
      s004: 'Update Organization Success',
      s005: 'Delete Organization Success',
      s006: 'Get All Project In Organization Success'
    }
  }
};

export default translationOrganization;
