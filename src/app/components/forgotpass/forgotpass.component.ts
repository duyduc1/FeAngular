import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css'
})
export class ForgotpassComponent {
  forgotpassObj: Forgotpass;
  message: string;

  constructor(private http: HttpClient) {
    this.forgotpassObj = new Forgotpass();
    this.message = '';
  }

  onSubmit() {
    this.http.post<any>('http://localhost:5000/forgotpass', this.forgotpassObj).subscribe(
      (res: any) => {
        this.message = res.message;
      },
      error => {
        console.error('Error:', error);
        this.message = 'Failed to send password reset email';
      }
    );
  }
}

export class Forgotpass {
  email: string;
  message: string;

  constructor() {
    this.email = '';
    this.message = '';
  }
}
