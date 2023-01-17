const translationTeam = {
  title: {
    list: 'Team List',
    create: 'Create Team',
    edit: 'Edit Team'
  },
  description: {
    list: 'This page are manage team has been create'
  },
  fields: {
    name: 'Team Name',
    project: 'Project Name',
    members: 'Members',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
  },
  tabs: {
    details: 'Details',
    setMembersToTeam: 'Set Members To Team'
  },
  labels: {
    addMember: 'Add Member',
    removeMember: 'Remove Member',
    activate: 'Please activated team for set members'
  },
  dialog: {
    title: 'Add Member',
    content: 'Add Members To Team'
  },
  search: 'Search by name...',
  popup: {
    title: 'Delete Team',
    content:
      'Are you sure you want to permanently delete the team name {{teamName}}?',
    verifyName: 'Please input team name {{teamName}}'
  },
  notifications: {
    errors: {
      e001: 'Data Invalid',
      e002: 'Team Has Duplicate',
      e003: 'ID Not Found',
      e004: 'Please remove all members of the team before deleting the team'
    },
    success: {
      s001: 'Get List Team Success',
      s002: 'Create Team Success',
      s003: 'Get Team By Id Success',
      s004: 'Update Team Success',
      s005: 'Delete Team Success',
      s006: 'Get All Member In Team Success',
      s007: 'Get All Member Not On Team Success',
      s008: 'Add Members To Team Success',
      s009: 'Remove Members From Team Success'
    }
  }
};

export default translationTeam;
