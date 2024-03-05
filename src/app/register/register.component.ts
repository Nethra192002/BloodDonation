import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private dataService: DataService, private router: Router) { }

  register(): void {
    if (this.name.trim() === '' || this.email.trim() === '' || this.password.trim() === '') {
      window.alert('All fields are required.'); 
      return; 
    }
    this.dataService.registerUser({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        window.alert('Registration successful'); 
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Registration failed', error);
        window.alert('Registration failed'); 
      }
    });
  }
}
