// homepage.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HttpClientModule, CommonModule , FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  contentList: any[] = [];
  filteredContent: any[] = [];
  searchTerm: string = '';
  error: string | null = null;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchContent();
  }

  fetchContent(): void {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      this.router.navigateByUrl('/login');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    this.http.get<any>('http://localhost:5000/home', { headers }).subscribe(
      (data) => {
        console.log(data);
        this.contentList = data;
      },
      (error) => {
        console.error('Error fetching content:', error);
        this.error = 'Error fetching content';
      }
    )
  }

  handleSearch(): void {
    this.filteredContent = this.contentList.filter((content) => {
      return content.categories.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             content.content.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}
