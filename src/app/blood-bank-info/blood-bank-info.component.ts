import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service'; // Adjust this path as needed

@Component({
  selector: 'app-blood-bank-info',
  templateUrl: './blood-bank-info.component.html',
  styleUrls: ['./blood-bank-info.component.css']
})
export class BloodBankInfoComponent implements OnInit {
  bloodBanks: any[] = [];
  filterPincode = ''; // Make sure this line is present

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchBloodBankInfo();
  }

  fetchBloodBankInfo() {
    this.dataService.getBloodBankInfo().subscribe({
      next: (data) => {
        this.bloodBanks = data;
      },
      error: (err) => console.error(err),
    });
  }

  fetchFilteredBloodBankInfo() { // Ensure this method is defined
    if (!this.filterPincode) {
      this.fetchBloodBankInfo(); // Fetch all if no pincode
      return;
    }
    this.dataService.getFilteredBloodBankInfo(this.filterPincode).subscribe({
      next: (data) => {
        this.bloodBanks = data;
      },
      error: (err) => console.error(err),
    });
  }

  clearFilters() {
    this.filterPincode = ''; // Reset the filter pincode
    this.fetchBloodBankInfo(); // Fetch the original list of blood banks
  }
}
