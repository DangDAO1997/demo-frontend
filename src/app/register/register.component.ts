import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
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

  checkPasswordsMatch() {
    // Kiểm tra xem mật khẩu và gõ lại mật khẩu có khớp nhau không
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
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
