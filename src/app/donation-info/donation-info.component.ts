// donation-info.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

// Define an interface for the donation object based on your data structure
interface Donation {
  blood_id: number;
  donor_id: number;
  name: string;
  bbank_id: number;
  bloodgroup: string;
  amt_blood: number;
  date_donated: string; // or Date if you're converting the string to a Date object
}

@Component({
  selector: 'app-donation-info',
  templateUrl: './donation-info.component.html',
  styleUrls: ['./donation-info.component.css']
})
export class DonationInfoComponent implements OnInit {
  donations: Donation[] = [];
  totalBloodDonated: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBloodDonations().subscribe({
      next: (data: Donation[]) => {
        this.donations = data;
        this.totalBloodDonated = data.reduce((acc: number, donation: Donation) => acc + donation.amt_blood, 0);
      },
      error: (error) => {
        console.error('Error fetching donations', error);
      }
    });
  }
}
