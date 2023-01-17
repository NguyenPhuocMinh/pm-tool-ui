const translationProject = {
  title: {
    list: 'Project List',
    create: 'Create Project',
    edit: 'Edit Project',
    tabs: {
      details: 'Project Details',
      setTeams: 'Set Teams To Project',
      organization: 'Organization In Project'
    }
  },
  description: {
    list: 'This page are manage project has been create'
  },
  fields: {
    name: 'Project Name',
    description: 'Description',
    activated: 'Activated',
    startDay: 'Start Day',
    endDay: 'End Day',
    organizationName: 'Organization Name',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    verify: 'Verify'
  },
  tabs: {
    details: 'Details',
    setTeamToProjects: 'Set Team To Projects',
    organizations: 'Organizations'
  },
  labels: {
    addTeam: 'Add Team',
    removeTeam: 'Remove Team',
    activate: 'Please activated project for set teams'
  },
  dialog: {
    title: 'Add Team',
    content: 'Add Teams To Project'
  },
  search: 'Search by project...',
  popup: {
    title: 'Delete Project',
    content:
      'Are you sure you want to permanently delete the project {{projectName}}?',
    verifyName: 'Please input project {{projectName}}'
  },
  notifications: {
    errors: {
      e001: 'Data Invalid',
      e002: 'Project Has Duplicate',
      e003: 'ID Not Found',
      e004: 'Please remove all teams of the project before deleting the project'
    },
    success: {
      s001: 'Get List Project Success',
      s002: 'Create Project Success',
      s003: 'Get Project By Id Success',
      s004: 'Update Project Success',
      s005: 'Delete Project Success',
      s006: 'Get All Member In Project Success',
      s007: 'Get All Member Not On Project Success',
      s008: 'Add Members To Project Success',
      s009: 'Remove Members From Project Success'
    }
  }
};

export default translationProject;
