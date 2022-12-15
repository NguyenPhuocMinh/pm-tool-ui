const translationRole = {
  title: {
    list: 'Danh sách vai trò',
    create: 'Tạo vai trò',
    edit: 'Chỉnh sửa vai trò'
  },
  description: {
    list: 'Trang này đang quản lý các vai trò đã được tạo'
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
      e001: 'Dữ Liệu Không Hợp Lệ',
      e002: 'Vai Trò Bị Trùng Lặp',
      e003: 'Không Tìm Thấy ID'
    },
    success: {
      s001: 'Lấy Danh Sách Vai Trò Thành Công',
      s002: 'Tạo Vai Trò Thành Công',
      s003: 'Lấy Vai Trò Theo ID Thành Công',
      s004: 'Cập Nhật Vai Trò Thành Công',
      s005: 'Xoá Vai Trò Thành Công',
      s006: 'Lấy Người Dùng Trong Vai Trò Thành Công',
      s007: 'Lấy Quyền Trong Vai Trò Thành Công'
    }
  }
};

export default translationRole;
