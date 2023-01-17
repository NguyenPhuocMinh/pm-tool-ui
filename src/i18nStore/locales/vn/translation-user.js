const translationUser = {
  title: {
    list: 'Danh sách người dùng',
    create: 'Tạo người dùng',
    edit: 'Chỉnh sửa người dùng',
    tabs: {
      details: 'Chi tiết người dùng',
      pass: 'Đặt mật khẩu người dùng',
      roles: 'Đặt vai trò người dùng',
      team: 'Người dùng trong nhóm'
    }
  },
  description: {
    list: 'Trang này đang quản lý người dùng đã được tạo'
  },
  fields: {
    firstName: 'Tên',
    lastName: 'Họ',
    fullName: 'Họ và tên',
    email: 'Email',
    teamName: 'Tên nhóm',
    password: 'Mật khẩu',
    passwordConfirm: 'Xác nhận mật khẩu',
    isPasswordTemporary: 'Tạm thời',
    isAdmin: 'Là quản trị viên',
    createdAt: 'Được tạo lúc',
    updatedAt: 'Cập nhật lúc'
  },
  tabs: {
    details: 'Chi tiết',
    setPassword: 'Đặt lại mật khẩu',
    setRolesToUser: 'Gán vai trò cho người dùng',
    team: 'Nhóm'
  },
  search: 'Tìm kiếm theo tên, email...',
  popup: {
    title: 'Xóa người dùng',
    content:
      'Bạn có chắc chắn muốn xóa vĩnh viễn người dùng {{userName}} không?',
    verifyName: 'Vui lòng nhập người dùng {{userName}}'
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
      e002: 'Email Bị Trùng Lặp',
      e003: 'Không tìm thấy ID',
      e004: 'Dữ Liệu Thay Đổi Mật Khẩu Không Hợp Lệ',
      e005: 'Mật Khẩu Hiện Tại Không Khớp',
      e006: 'Dữ Liệu Đặt Mật Khẩu Không Hợp Lệ',
      e007: 'Dữ Liệu Làm Mới Mật Khẩu Không Hợp Lệ'
    },
    success: {
      s001: 'Lấy Danh Sách Người Dùng Thành Công',
      s002: 'Tạo Người Dùng Thành Công',
      s003: 'Lấy Người Dùng Theo ID Thành Công',
      s004: 'Cập Nhật Người Dùng Thành Công',
      s005: 'Xoá Người Dùng Thành Công',
      s006: 'Thay Đổi Mật Khẩu Người Dùng Thành Công',
      s007: 'Đặt Lại Mật Khẩu Người Dùng Thành Công',
      s008: 'Làm Mới Mật Khẩu Người Dùng Thành Công',
      s009: 'Thêm Vai Trò Cho Người Dùng THành Công'
    }
  }
};

export default translationUser;
