import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupObj: singUp;
  constructor(private http: HttpClient, private router: Router) {
    this.signupObj = new singUp();
  }
  onSignup() {
    this.http.post('http://localhost:5000/register', this.signupObj).subscribe((res: any) => {
      if (res) {
        console.log(res);
        alert("Đăng ký thành công")
        this.router.navigateByUrl("/login")
      } else {
        alert("Vui lòng nhập thông tin chính xác");
      }
    },
      (error) => {
        alert("Vui lòng nhập thông tin chính xác")
      })
  }
}

export class singUp {
  username: String;
  password: String;
  email: String;
  numberphone: String;
  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.numberphone = '';
  }
}
