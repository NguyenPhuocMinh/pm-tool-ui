const translationNotifyTemplate = {
  title: {
    list: 'Danh sách mẫu thông báo',
    create: 'Tạo mẫu thông báo',
    edit: 'Chỉnh sửa mẫu thông báo'
  },
  description: {
    list: 'Trang này quản lý mẫu thông báo đã được tạo'
  },
  fields: {
    topic: 'Chủ đề',
    description: 'Miêu tả',
    content: 'Nội dung',
    Type: 'Loại thông báo',
    activated: 'Kích hoạt',
    createdAt: 'Ngày tạo',
    updatedAt: 'Ngày cập nhật'
  },
  types: {
    t001: 'HỆ THỐNG THÔNG BÁO',
    t002: 'THÔNG BÁO SỰ KIỆN',
    t003: 'THÔNG BÁO CẢNH BÁO',
    t004: 'THÔNG BÁO QUAN TRỌNG',
    t005: 'THÔNG BÁO NHẮC NHỞ',
    t006: 'THÔNG BÁO NHẮC THAY ĐỔI PASS TẠM THỜ'
  },
  search: 'Tìm kiếm theo chủ đề...',
  popup: {
    title: 'Xoá mẫu thông báo',
    content:
      'Bạn có chắc chắn muốn xóa vĩnh viễn the mẫu thông báo {{topicName}}?',
    verifyName: 'Vui lòng nhập mẫu thông báo {{topicName}}'
  }
};

export default translationNotifyTemplate;
