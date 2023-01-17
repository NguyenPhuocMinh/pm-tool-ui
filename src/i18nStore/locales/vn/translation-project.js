const translationProject = {
  title: {
    list: 'Danh sách dự án',
    create: 'Tạo dự án',
    edit: 'Chỉnh sửa dự án'
  },
  description: {
    list: 'Trang này quản lý dự án đã được tạo'
  },
  fields: {
    name: 'Tên dự án',
    activated: 'Kích hoạt',
    createdAt: 'Ngày tạo',
    updatedAt: 'Ngày Cập nhật'
  },
  tabs: {
    details: 'Thông tin chi tiết',
    setTeamToProjects: 'Gán đội cho dự án',
    setProjectToOrganization: 'Gán dự án cho tổ chức'
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
  search: 'Tìm kiếm theo dự án...',
  popup: {
    title: 'Xóa dự án',
    content: 'Bạn có chắc chắn muốn xóa vĩnh viễn dự án {{projectName}}?',
    verifyName: 'Vui lòng nhập dự án {{projectName}}'
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
