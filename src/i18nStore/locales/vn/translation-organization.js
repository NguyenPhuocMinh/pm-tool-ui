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
      e003: 'Không Tìm Thấy ID'
    },
    success: {
      s001: 'Lấy Danh Sách Tổ Chức Thành Công',
      s002: 'Tạo Tổ Chức Thành Công',
      s003: 'Lấy Tổ Chức Thành Công',
      s004: 'Cập Tổ Chức Thành Công',
      s005: 'Xoá Tổ Chức Thành Công'
    }
  }
};

export default translationOrganization;
