import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadstatus',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './uploadstatus.component.html',
  styleUrl: './uploadstatus.component.css'
})

export class UploadstatusComponent implements OnInit {
  statuses: any[] = [];
  error: string | null = null;
  categories: string = '';
  content: string = '';
  updateStatusId: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchStatuses();
  }

  fetchStatuses(): void {
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
      this.router.navigateByUrl('/login');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`
    });

    this.http.get<any[]>('http://localhost:5000/userupload', { headers })
      .subscribe(
        response => this.statuses = response,
        error => {
          console.error('Error fetching statuses:', error);
          this.error = 'Không có dữ liệu';
        }
      );
  }

  handlePostStatus(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });

    const data = {
      categories: this.categories,
      content: this.content
    };

    const url = this.updateStatusId
      ? `http://localhost:5000/userupload/${this.updateStatusId}`
      : 'http://localhost:5000/userupload';

    const requestMethod = this.updateStatusId ? 'put' : 'post';
    this.http[requestMethod](url, data, { headers })
      .subscribe(
        () => {
          this.fetchStatuses();
          this.clearForm();
          this.updateStatusId = null;
          alert('Cập nhật thành công!');
        },
        error => console.error('Error creating/updating status:', error)
      );
  }

  handleUpdateStatus(statusId: string): void {
    console.log('Updating status with ID:', statusId);
    console.log('Categories:', this.categories);
    console.log('Content:', this.content);
    this.updateStatusId = statusId;

    const statusToUpdate = this.statuses.find((s) => s._id === statusId);

    if (statusToUpdate) {
      this.categories = statusToUpdate.categories;
      this.content = statusToUpdate.content;
    }
  }

  handleDeleteStatus(statusId: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    });

    this.http.delete(`http://localhost:5000/userupload/${statusId}`, { headers })
      .subscribe(
        () => {
          this.statuses = this.statuses.filter((s) => s._id !== statusId);
          alert('Xóa thành công!');
        },
        error => console.error('Error deleting status:', error)
      );
  }

  clearForm(): void {
    this.categories = '';
    this.content = '';
  }
}
