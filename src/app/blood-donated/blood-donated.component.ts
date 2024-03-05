import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

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
  selector: 'app-blood-donated',
  templateUrl: './blood-donated.component.html',
  styleUrls: ['./blood-donated.component.css']
})
export class BloodDonatedComponent implements OnInit {

  donations: Donation[] = [];
  totalBloodDonated: number = 0;
  showAddForm: boolean = false;
  newDonation = {
    blood_id:'',
    donor_id: '',
    name: '',
    bbank_id: '',
    bloodgroup: '',
    amt_blood: null,
    date_donated: ''
  };
  successMessage: string = '';
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getDonations();
  }
  getDonations() {
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
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addDonation() {
    // Validate form inputs
    if (this.newDonation.blood_id && this.newDonation.donor_id && this.newDonation.name && this.newDonation.bbank_id && this.newDonation.bloodgroup && this.newDonation.amt_blood && this.newDonation.date_donated) {
      this.dataService.addBloodDonation(this.newDonation).subscribe({
        next: (response) => {
          // Handle successful donation addition
          this.successMessage = 'Donation added successfully!';
          this.getDonations(); // Refresh the list
          this.toggleAddForm();
          this.newDonation = {
            blood_id:'',
            donor_id: '',
            name: '',
            bbank_id: '',
            bloodgroup: '',
            amt_blood: null,
            date_donated: ''
          };
          this.showAddForm = false; // Close the form
          setTimeout(() => this.successMessage = '', 3000);
          // Optionally, refresh the list of donations
        },
        error: (error) => {
          console.error('Failed to add donation', error);
        }
      });
    } else {
      alert('All fields are required!');
    }
  }

  deleteDonation(blood_id: number) {
    if (confirm('Are you sure you want to delete this donation record?')) {
      this.dataService.deleteDonation(blood_id).subscribe({
        next: () => {
          this.successMessage = 'Donation removed successfully!';
          this.getDonations();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Error deleting donation:', err);
          
        }
      });
    }
  }
}
