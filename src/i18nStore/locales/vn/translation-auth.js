const translationAuth = {
  notifications: {
    errors: {
      emailIsRequired: 'Email bắt buộc',
      passwordIsRequired: 'Mật khẩu bắt buộc',
      userNotFound: 'Không tìm thấy người dùng',
      passwordIsInCorrect: 'Mật khẩu Không đúng',
      tokenNotFound: 'Không tìm thấy mã thông báo',
      tokenExpiredError: 'Mã thông báo Hết hạn. Xin vui lòng đăng nhập lại!',
      refreshTokenExpiredError:
        'Mã thông báo Hết hạn. Xin vui lòng đăng nhập lại!',
      tokenInvalidError: 'Mã thông báo không hợp lệ',
      tokenForbidden: 'Bị cấm',
      tokenInBlackListError: 'Mã thông báo trong danh sách đen'
    },
    success: {
      signIn: 'Đăng nhập tài khoản thành công',
      signOut: 'Đăng xuất tài khoản thành công',
      revokeToken: 'Thu hồi mã thông báo thành công'
    }
  }
};

export default translationAuth;
