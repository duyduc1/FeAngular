import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-resetpass',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './resetpass.component.html',
  styleUrl: './resetpass.component.css'
})
export class ResetpassComponent {
  resetpassObj: Resetpass;
  message: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.resetpassObj = new Resetpass();
    this.message = '';
  }

  onSubmit() {
    const userId = this.route.snapshot.params['userId'];
    const token = this.route.snapshot.params['token'];

    this.http.post<any>(`http://localhost:5000/resetpass/${userId}/${token}`, { newPassword: this.resetpassObj.newPassword }).subscribe(
      (res: any) => {
        this.message = res.message;
      },
      error => {
        console.error('Error:', error);
        this.message = 'Failed to reset password';
      }
    );
  }
}

export class Resetpass {
  newPassword: string;
  message: string;
  constructor() {
    this.newPassword = '';
    this.message = '';
  }
}
