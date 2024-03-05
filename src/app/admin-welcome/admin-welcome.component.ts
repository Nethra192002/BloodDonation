import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html',
  styleUrls: ['./admin-welcome.component.css']
})
export class AdminWelcomeComponent implements OnInit {
  showProfileCard = false;
  userProfile: { name: string, email: string } = { name: '', email: '' };
  bloodBankCount: number = 0;
  donorCount: number = 0;
  patientsCount: number = 0;
  totalBloodDonated: number = 0;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    // Try to retrieve the admin information from localStorage
    const admin = JSON.parse(localStorage.getItem('admin') || '{}');
    if (admin && admin.email) {
      this.userProfile.name = admin.name;
      this.userProfile.email = admin.email;
    } else {
      // If no admin info is available, navigate to the login page
      this.router.navigate(['/login']);
    }
    this.dataService.getBloodBankCount().subscribe(count => this.bloodBankCount = count);
    this.dataService.getDonorCount().subscribe({
      next: (data) => {
        this.donorCount = data.donorCount;
      },
      error: (err) => console.error(err),
    });
    
    this.dataService.getPatientsCount().subscribe(count => this.patientsCount = count);
    this.dataService.getTotalBloodDonated().subscribe(total => this.totalBloodDonated = total);
  }


  toggleProfileCard(): void {
    this.showProfileCard = !this.showProfileCard;
  }

  // Inside admin-welcome.component.ts

  logout(): void {
    localStorage.removeItem('admin'); // Clear admin info
    this.router.navigate(['/login']); // Navigate back to the login page
  }


}
