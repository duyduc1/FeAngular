import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']); 
    alert('Đăng xuất thành công!');
  }
}
