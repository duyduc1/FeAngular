import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any;
  error: string | null = null;
  contentList: any[] = []; 
  filteredContent: any[] = []; 
  searchTerm: string = ''; 

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      this.router.navigateByUrl('/login');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    this.http.get<any>('http://localhost:5000/profile', { headers })
      .subscribe(
        (data) => {
          this.user = data;
        },
        (error) => {
          console.error('Không thể lấy được dữ liệu', error);
          this.error = 'Không thể lấy được dữ liệu';
        }
      );
  }

}
