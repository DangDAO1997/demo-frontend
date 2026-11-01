import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  constructor(private http: HttpClient, private router: Router) { 
    this.phoneNumber = '090';
    this.password = '12345';
    this.retypePassword = '12345';
    this.fullName = 'John Doe';
    this.address = '123 Main St';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }

  onPhoneChange() {
    // Xử lý sự kiện khi giá trị của phone thay đổi
    console.log('Phone changed:', this.phoneNumber);
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

    const apiUrl = 'http://localhost:8088/api/v1/users/register';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const registerData = {
      "fullname": this.fullName,
        "phone_number": this.phoneNumber,
        "address": this.address,
        "password": this.password,
        "retype_password": this.retypePassword,
        "date_of_birth": this.dateOfBirth,
        "facebook_account_id": 0,
        "google_account_id": 0,
        "role_id": 1
    };

    this.http.post(apiUrl, registerData, { headers }).subscribe({
      next: (response: any) => {
        debugger;
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger;
        console.log('Request completed');
      },
      error: (error: any) => {
        debugger;
        console.error('Lỗi khi đăng ký:', error);
      }
    });
  }
}
