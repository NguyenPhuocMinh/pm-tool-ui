const translationPermission = {
  title: {
    create: 'Tạo quyền',
    edit: 'Chỉnh sửa quyền',
    tabs: {
      roles: 'Đặt vai trò'
    }
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
      idNotFound: 'Không tìm thấy ID',
      duplicateName: 'Tên quyền bị trùng lặp',
      requiredName: 'Tên quyền bắt buộc'
    },
    success: {
      create: 'Tạo quyền thành công!',
      edit: 'Chỉnh sửa quyền thành công!',
      delete: 'Xoá quyền thành công!',
      addRoles: 'Thêm vai trò vào quyền thành công!'
    }
  }
};

export default translationPermission;
