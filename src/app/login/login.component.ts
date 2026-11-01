import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string;
  password: string;

  constructor(private router: Router, private userService: UserService) { 
    this.phoneNumber = '090';
    this.password = '12345';
  }
  onPhoneNumberChange() {
    console.log('Phone number changed:', this.phoneNumber);
  }

  login() {
    const loginData = {
      "phone_number": this.phoneNumber,
      "password": this.password
    };

    this.userService.login(loginData).subscribe({
      next: (response: any) => {
        debugger;
        // this.router.navigate(['/home']);
      },
      complete: () => {
        debugger;
        console.log('Request completed');
      },
      error: (error: any) => {
        debugger;
        console.error('Lỗi khi đăng nhập:', error);
      }
    });
  }
}
