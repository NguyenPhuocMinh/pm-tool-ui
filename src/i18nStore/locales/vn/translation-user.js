const translationUser = {
  title: {
    list: 'Danh sách người dùng',
    create: 'Tạo người dùng',
    edit: 'Chỉnh sửa người dùng',
    tabs: {
      details: 'Chi tiết người dùng',
      pass: 'Đặt mật khẩu người dùng',
      roles: 'Đặt vai trò người dùng'
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
    setRolesToUser: 'Gán vai trò cho người dùng'
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
      fistNameIsRequired: 'Tên là bắt buộc',
      lastNameIsRequired: 'Họ là bắt buộc',
      emailIsRequired: 'Email là bắt buộc',
      passwordIsRequired: 'Mật khẩu là bắt buộc',
      passwordConfirmIsRequired: 'Yêu cầu xác nhận mật khẩu',
      emailIsNotFormat: 'Định dạng email không hợp lệ',
      passwordIsValidLength: 'Mật khẩu có độ dài không hợp lệ',
      passwordConfirmIsValidLength: 'Mật khẩu xác nhận là độ dài không hợp lệ',
      passwordConfirmIsNotMatches: 'Mật khẩu xác nhận không khớp',
      currentPasswordIsRequired: 'Mật khẩu hiện tại là bắt buộc',
      newPasswordConfirmIsRequired: 'Yêu cầu xác nhận mật khẩu mới',
      currentPasswordIsNotMatches: 'Mật khẩu hiện tại không khớp',
      emailIsDuplicate: 'Email bị trùng lặp',
      idNotFound: 'Không tìm thấy ID'
    },
    success: {
      create: 'Tạo người dùng thành công!',
      edit: 'Chỉnh sửa người dùng thành công!',
      delete: 'Xóa người dùng thành công!',
      addRoles: 'Thêm vai trò cho người dùng thành công!',
      changePassword: 'Thay đổi mật khẩu thành công!',
      setPassword: 'Đặt mật khẩu tạm thời thành công!',
      resetPassword: 'Làm mới mật khẩu thành công!'
    }
  }
};

export default translationUser;
