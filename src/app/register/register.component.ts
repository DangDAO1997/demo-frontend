import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // Khai báo biến để lưu giá trị nhập từ người dùng
  phone: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor() { 
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneChange() {
    // Xử lý sự kiện khi giá trị của phone thay đổi
    console.log('Phone changed:', this.phone);
  }

  register() {
    // Xử lý logic đăng ký người dùng
    if (!this.isAccepted) {
      alert('Bạn phải đồng ý với các điều khoản và điều kiện.');
      return;
    }

    if (this.password !== this.retypePassword) {
      alert('Mật khẩu và gõ lại mật khẩu không khớp.');
      return;
    }

    // Thực hiện đăng ký người dùng với các thông tin đã nhập
    console.log('Đăng ký người dùng:', {
      phone: this.phone,
      password: this.password,
      fullName: this.fullName,
      dateOfBirth: this.dateOfBirth,
      address: this.address
    });
  }
}
