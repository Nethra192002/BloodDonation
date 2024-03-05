// app.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <!-- Your app's template -->
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {
    // Check if the current route is the root
    if (window.location.pathname === '/') {
      localStorage.removeItem('admin'); // Clear admin info
      this.router.navigate(['/login']); // Navigate to login
    }
  }
}
