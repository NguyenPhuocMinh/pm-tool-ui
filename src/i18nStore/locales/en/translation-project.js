const translationProject = {
  title: {
    list: 'Project List',
    create: 'Create Project',
    edit: 'Edit Project'
  },
  description: {
    list: 'This page are manage project has been create'
  },
  fields: {
    name: 'Project Name',
    description: 'Description',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    verify: 'Verify'
  },
  tabs: {
    details: 'Details',
    setProjectToOrganization: 'Set Project To Organization',
    setTeamToProject: 'Set Team To Project'
  },
  search: 'Search by project...',
  popup: {
    title: 'Delete Project',
    content:
      'Are you sure you want to permanently delete the project {{projectName}}?',
    verifyName: 'Please input project {{projectName}}'
  }
};

export default translationProject;
