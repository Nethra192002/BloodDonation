import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  showProfileCard = false;
  userProfile: { name: string, email: string } = { name: '', email: '' };
  bloodBankCount: number = 0;
  donorCount: number = 0;
  patientsCount: number = 0;
  totalBloodDonated: number = 0;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.userProfile.name = user.name;
      this.userProfile.email = user.email;
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

  logout(): void {
    localStorage.removeItem('user'); // Clear user info
    this.router.navigate(['/login']); // Navigate back to login
  }
}
