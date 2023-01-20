const translationOrganization = {
  title: {
    list: 'Danh sách tổ chức',
    create: 'Tạo tổ chức',
    edit: 'Chỉnh sửa tổ chức'
  },
  description: {
    list: 'Trang này đang quản lý tổ chức đã được tạo'
  },
  fields: {
    name: 'Tên tổ chức',
    activated: 'Đã kích hoạt',
    createdAt: 'Ngày tạo',
    updatedAt: 'Ngày Cập nhật'
  },
  tabs: {
    details: 'Thông tin chi tiết',
    setProjectsToOrganization: 'Set Projects To Organization'
  },
  labels: {
    createProject: 'Create Project',
    addProject: 'Add Project',
    removeProject: 'Remove Project',
    activate: 'Please activated organization for set projects'
  },
  dialog: {
    title: 'Add Project',
    content: 'Add Projects To Organization'
  },
  search: 'Tìm kiếm theo tổ chức',
  popup: {
    title: 'Xóa tổ chức',
    content:
      'Bạn có chắc chắn muốn xóa vĩnh viễn tổ chức {{organizationName}} này không?'
  },
  notifications: {
    errors: {
      e001: 'Dữ Liệu Không Hợp Lệ',
      e002: 'Tổ Chức Bị Trùng Lặp',
      e003: 'Không Tìm Thấy ID',
      e004: 'Please Remove All Project In Organization'
    },
    success: {
      s001: 'Lấy Danh Sách Tổ Chức Thành Công',
      s002: 'Tạo Tổ Chức Thành Công',
      s003: 'Lấy Tổ Chức Thành Công',
      s004: 'Cập Tổ Chức Thành Công',
      s005: 'Xoá Tổ Chức Thành Công',
      s006: 'Get All Project In Organization Success',
      s007: 'Get All Project Not On Organization Success',
      s008: 'Add Projects To Organization Success',
      s009: 'Remove Projects From Organization Success'
    }
  }
};

export default translationOrganization;
