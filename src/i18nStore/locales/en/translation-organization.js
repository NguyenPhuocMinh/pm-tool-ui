const translationOrganization = {
  menuName: 'Organization',
  title: {
    create: 'Create Organization',
    edit: 'Edit Organization'
  },
  fields: {
    name: 'Organization Name',
    activated: 'Activated',
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    verify: 'Verify'
  },
  search: 'Search by organization',
  popup: {
    title: 'Delete Organization',
    content:
      'Are you sure you want to permanently delete the organization {{organizationName}}?',
    verifyName: 'Please input organization {{organizationName}}'
  }
};

export default translationOrganization;
