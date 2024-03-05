import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service'; // Correct this path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isAdminLogin = false; // Toggle to switch between admin/user login
  adminEmail: string = '';
  adminPassword: string = '';

  constructor(private dataService: DataService, private router: Router) { }
  login(): void {
    if (this.email.trim() === '' || this.password.trim() === '') {
      window.alert('All fields are required.'); 
      return; 
    }
    this.dataService.loginUser({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('user', JSON.stringify({ name: response.user.name, email: response.user.email }));
        setTimeout(() => {
          this.router.navigate(['/welcome']);
        }, 1000);
      },
      error: (error) => {
        console.error('Login failed', error);
        window.alert('Login failed'); 
      }
    });
  }

  loginAdmin(): void {
    const adminCredentials = {
      email: this.adminEmail,
      password: this.adminPassword
    };
    if (this.adminEmail.trim() === '' || this.adminPassword.trim() === '') {
      window.alert('All fields are required.'); 
      return; 
    }
    this.dataService.loginAdmin(adminCredentials).subscribe({
      next: (response) => {
        console.log('Admin login successful', response);
        localStorage.setItem('admin', JSON.stringify(response.admin)); 
        setTimeout(() => {
          this.router.navigate(['/admin-welcome']);
        }, 1000);
      },
      error: (error) => {
        console.error('Admin login failed', error);
        window.alert('Login failed'); 
      }
    });
  }

  toggleAdminLogin(): void {
    this.isAdminLogin = !this.isAdminLogin;
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
    if (localStorage.getItem('admin')) {
      this.router.navigate(['/admin-welcome']);
    }
  }
}

