const translationSession = {
  title: {
    list: 'Phiên hoạt động'
  },
  descriptions: {
    list: 'Phiên là phiên người dùng truy cập trong phiên'
  },
  fields: {
    user: 'Người dùng',
    userAgent: 'Thiết bị người dùng',
    ipAddress: 'Địa chỉ IP',
    startAccess: 'Bắt đầu truy cập',
    lastAccess: 'Truy cập lần cuối'
  },
  search: 'Tìm kiếm theo tên người dùng...',
  popup: {
    title: 'Xóa phiên',
    content: 'Bạn có chắc chắn muốn xóa vĩnh viễn phiên {{sessionName}} không?',
    verifyName: 'Vui lòng nhập phiên {{sessionName}}'
  },
  notifications: {
    errors: {
      idNotFound: 'Không tìm thấy ID'
    },
    success: {
      delete: 'Xóa phiên thành công!',
      revoke: 'Thu hồi phiên thành công!'
    }
  }
};

export default translationSession;
