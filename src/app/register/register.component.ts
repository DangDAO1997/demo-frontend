import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
