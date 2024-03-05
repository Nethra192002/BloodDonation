import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Correct the path as needed

@Component({
  selector: 'app-check-donors',
  templateUrl: './check-donors.component.html',
  styleUrls: ['./check-donors.component.css']
})
export class CheckDonorsComponent implements OnInit {

  donors: any[] = [];
  filterBloodGroup = '';
  successMessage='';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchDonors();
  }

  fetchDonors() {
    this.dataService.getDonors().subscribe({
      next: (data) => {
        this.donors = data;
      },
      error: (err) => console.error(err),
    });
  }

  fetchFilteredDonors() {
    if (!this.filterBloodGroup) {
      this.fetchDonors(); // Fetch all if no blood group filter is provided
      return;
    }
    this.dataService.getDonorsByBloodGroup(this.filterBloodGroup).subscribe({
      next: (data) => {
        this.donors = data;
      },
      error: (err) => console.error(err),
    });
  }

  clearFilters() {
    this.filterBloodGroup = '';
    this.fetchDonors();
  }

  deleteDonor(donorId: number) {
    if (confirm('Are you sure you want to delete this donor?')) {
      this.dataService.deleteDonor(donorId).subscribe({
        next: () => {
          this.successMessage = 'Donor deleted successfully';
          this.fetchDonors();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Error deleting donor:', err);
        }
      });
    }
  }
  
}
