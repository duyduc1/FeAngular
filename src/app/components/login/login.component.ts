import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;
  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }
  onLogin() {
    this.http.post('http://localhost:5000/login', this.loginObj).subscribe(
      (res: any) => {
        if (res) {
          const token = res.token
          localStorage.setItem("userToken", token)
          alert("Đăng nhập thành công");
          this.router.navigateByUrl("/home");
        } else {
          console.log("Phản hồi không hợp lệ từ máy chủ");
        }
      },
      (error) => {
        alert("Sai mật khẩu")
      }
    );
  }

  onLogout() {
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('/login');
  }
}
export class Login {
  username: String;
  password: String;
  constructor() {
    this.username = '';
    this.password = '';
  }
}