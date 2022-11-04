const translationValidator = {
  required: 'Bắt buộc',
  minLength: 'Ít nhất phải có {{min}} ký tự',
  maxLength: 'Phải có {{max}} ký tự trở xuống',
  minValue: 'Ít nhất phải là {{min}}',
  maxValue: 'Phải từ {{max}} trở xuống',
  password:
    'Phải chứa 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự chữ hoa đặc biệt',
  passwordConfirm: 'Mật khẩu xác nhận không khớp với mật khẩu',
  email: 'Email không khớp với định dạng',
  trim: 'Vui lòng xóa khoảng trắng',
  uppercase: 'Vui lòng nhập các từ viết hoa',
  notMatchesValue: 'Không khớp với giá trị {{verifyValue}}'
};

export default translationValidator;
