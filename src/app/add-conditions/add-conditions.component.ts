// In your add-conditions.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-conditions',
  templateUrl: './add-conditions.component.html',
  styleUrls: ['./add-conditions.component.css']
})
export class AddConditionsComponent implements OnInit {
  bloodDonationCriteria: any[] = []; // This will store the fetched criteria
  showAddForm: boolean = false;
  newCriteria = { condition: '', eligibility: '' }; // Used for binding form inputs
  successMessage: string = '';

  constructor(private dataService: DataService) { }

//   bloodBanks: any[] = [];
//   filterPincode: string = '';
//   showAddForm: boolean = false;
//   newBank = { bbank_id: '', bbank_name: '', address: '', state: '', pincode: '' };
//   successMessage: string = '';
//   constructor(private dataService: DataService) { }

// // Inside your ngOnInit
//   ngOnInit() {
//     this.fetchBloodBanks();
//   }


//   fetchBloodBanks() {
//     this.dataService.getBloodBanks().subscribe(
//       data => {
//         this.bloodBanks = data;
//       },
//       error => {
//         console.error('Error fetching blood banks:', error);
//       }
//     );
//   }
  // bloodDonationCriteria: any[] = [];
  selectedCondition: string = ''; 
  formVisible: boolean = false;
  isEligible: boolean | null = null;

  // constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBloodDonationCriteria1().subscribe({
      next: (data) => {
        this.bloodDonationCriteria = [{ Conditions: 'None', Eligibility: 'Eligible' }, ...data];
        
      },
      error: (error) => {
        console.error('Error fetching criteria', error);
      }
    });
  }

  fetchBloodDonationCriteria() {
    this.dataService.getBloodDonationCriteria1().subscribe(
      data => {
        console.log(data); // Check what's being received
        this.bloodDonationCriteria = data;
      },
      error => console.error('Error fetching blood donation criteria:', error)
    );
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  addCriteria() {
    if (this.newCriteria.condition && this.newCriteria.eligibility) {
      this.dataService.addBloodDonationCriteria(this.newCriteria).subscribe({
        next: response => {
          this.bloodDonationCriteria.push(this.newCriteria); // Add the new criteria to the list
          this.newCriteria = { condition: '', eligibility: '' }; // Reset the form
          this.toggleAddForm(); // Hide the form
          this.successMessage = 'Criteria added successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: error => console.error('Failed to add criteria', error)
      });
    } else {
      alert('All fields are required!');
    }
  }
}
