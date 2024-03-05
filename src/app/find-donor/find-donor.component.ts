// find-donor.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Correct the path as needed

@Component({
  selector: 'app-find-donor',
  templateUrl: './find-donor.component.html',
  styleUrls: ['./find-donor.component.css']
})
export class FindDonorComponent implements OnInit {
  donors: any[] = [];
  filterBloodGroup = '';

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
}
