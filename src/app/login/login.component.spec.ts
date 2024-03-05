// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  login(email: string, password: string) {
    this.authService.loginUser({
      email, password,
      name: ''
    }).subscribe(
      response => {
        console.log('User logged in', response);
        // Navigate to welcome page or store token
      },
      error => {
        console.error('Error logging in', error);
      }
    );
  }
}
