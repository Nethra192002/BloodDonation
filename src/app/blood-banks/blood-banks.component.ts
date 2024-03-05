import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-blood-banks',
  templateUrl: './blood-banks.component.html',
  styleUrls: ['./blood-banks.component.css']
})
export class BloodBanksComponent implements OnInit {
  bloodBanks: any[] = [];
  filterPincode: string = '';
  showAddForm: boolean = false;
  newBank = { bbank_id: '', bbank_name: '', address: '', state: '', pincode: '' };
  successMessage: string = '';
  constructor(private dataService: DataService) { }

// Inside your ngOnInit
  ngOnInit() {
    this.fetchBloodBanks();
  }


  fetchBloodBanks() {
    this.dataService.getBloodBanks().subscribe(
      data => {
        this.bloodBanks = data;
      },
      error => {
        console.error('Error fetching blood banks:', error);
      }
    );
  }

  fetchFilteredBloodBankInfo() {
    if (this.filterPincode) {
      this.dataService.getFilteredBloodBanks(this.filterPincode).subscribe(data => {
        this.bloodBanks = data;
      });
    } else {
      this.fetchBloodBanks();
    }
  }

  clearFilters() {
    this.filterPincode = '';
    this.fetchBloodBanks();
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  // Inside BloodBanksComponent

addBloodBank() {
  // Ensure all inputs are provided
  if (this.newBank.bbank_id && this.newBank.bbank_name && this.newBank.address && this.newBank.state && this.newBank.pincode) {
    this.dataService.addBloodBank(this.newBank).subscribe({
      next: (response) => {
        // Assuming your server sends back a message as part of the response
        this.successMessage = 'Blood bank added successfully'; // or use response.message if your API sends a message
        this.fetchBloodBanks(); // Refresh the list
        this.toggleAddForm(); // Hide the form
        // Reset the form
        this.newBank = { bbank_id: '', bbank_name: '', address: '', state: '', pincode: '' };
        // Clear the success message after 3 seconds
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Failed to add blood bank', error);
      }
    });
  } else {
    alert('All fields are required!');
  }
}

deleteBloodBank(bbank_id: string) {
  if (confirm(`Are you sure you want to delete bank ID ${bbank_id}?`)) {
    this.dataService.deleteBloodBank(bbank_id).subscribe({
      next: (response) => {
        this.successMessage = 'Blood bank deleted successfully';
        this.fetchBloodBanks(); // Refresh the list after deletion
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Failed to delete blood bank', error);
      }
    });
  }
}

  
}
