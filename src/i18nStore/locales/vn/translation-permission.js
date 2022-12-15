const translationPermission = {
  title: {
    list: 'Danh sách quyền',
    create: 'Tạo quyền',
    edit: 'Chỉnh sửa quyền',
    tabs: {
      roles: 'Đặt vai trò'
    }
  },
  description: {
    list: 'Trang này quản lý quyền đã được tạo'
  },
  fields: {
    id: 'Quyền ID',
    name: 'Tên quyền',
    description: 'Mô tả quyền',
    activated: 'Kích hoạt',
    createdAt: 'Ngày tạo',
    updatedAt: 'Ngày Cập nhật'
  },
  tabs: {
    details: 'Thông tin chi tiết',
    setRolesToPermission: 'Gán vai trò cho quyền'
  },
  search: 'Tìm kiếm theo tên',
  popup: {
    title: 'Xóa quyền',
    content:
      'Bạn có chắc chắn muốn xóa vĩnh viễn quyền {{permissionName}} này không?',
    verifyName: 'Vui lòng nhập {{permissionName}}'
  },
  transferList: {
    roles: {
      titleLeft: 'Các vai trò khả dụng',
      titleRight: 'Các vai trò được chỉ định'
    }
  },
  notifications: {
    errors: {
      e001: 'Dữ Liệu Không Hợp Lệ',
      e002: 'Quyền Bị Trùng Lặp',
      e003: 'Không Tìm Thấy ID'
    },
    success: {
      s001: 'Lấy Danh Sách Quyền Thành Công',
      s002: 'Tạo Quyền Thành Công',
      s003: 'Lấy Quyền Thành Công',
      s004: 'Cập Nhật Quyền Thành Công',
      s005: 'Xoá Quyền Thành Công',
      s006: 'Thêm Vai Trò Vào Quyền Thành Công'
    }
  }
};

export default translationPermission;
