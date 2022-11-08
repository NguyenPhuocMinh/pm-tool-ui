const translationRole = {
  title: {
    create: 'Tạo vai trò',
    edit: 'Chỉnh sửa vai trò'
  },
  fields: {
    name: 'Tên vai trò',
    description: 'Mô tả vai trò',
    activated: 'Kích hoạt',
    createdAt: 'Ngày tạo',
    updatedAt: 'Ngày Cập nhật'
  },
  tabs: {
    details: 'Chi tiết',
    usersInRole: 'Người dùng có vai trò',
    permissionsInRole: 'Quyền trong vai trò'
  },
  search: 'Tìm kiếm theo tên',
  popup: {
    title: 'Xóa vai trò',
    content:
      'Bạn có chắc chắn muốn xóa vĩnh viễn vai trò {{roleName}} này không?'
  },
  notifications: {
    errors: {
      idNotFound: 'Không tìm thấy ID',
      duplicateName: 'Tên vai trò bị trùng lặp',
      requiredName: 'Tên vai trò bắt buộc'
    },
    success: {
      create: 'Tạo vai trò thành công!',
      edit: 'Chỉnh sửa vai trò thành công!',
      delete: 'Xoá vai trò thành công!'
    }
  }
};

export default translationRole;
