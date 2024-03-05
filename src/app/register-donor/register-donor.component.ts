// register-donor.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register-donor',
  templateUrl: './register-donor.component.html',
  styleUrls: ['./register-donor.component.css']
})
export class RegisterDonorComponent {
  donor = {
    name: '',
    age: null,
    gender: '',
    bloodgroup: '',
    email: '',
    password: '',
    pincode: ''
  };
  successMessage: string = '';
  errorMessage: string = '';
  bloodDonationCriteria: any[] = [];
  selectedCondition: string = ''; 
  formVisible: boolean = false;
  isEligible: boolean | null = null;

  constructor(private dataService: DataService) { }

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

  onConditionSelect(): void {
    const selectedCriteria = this.bloodDonationCriteria.find(c => c.Conditions === this.selectedCondition);
    if (this.selectedCondition === 'None') {
      
      this.isEligible = true;
      this.formVisible = true;
      this.errorMessage = '';
    } else {
      const condition = this.bloodDonationCriteria.find(c => c.Conditions === this.selectedCondition);
      this.errorMessage = condition?.Eligibility === 'Permanent' ?
        'You are not eligible to be a donor due to a permanent condition.' :
        'You are temporarily ineligible to be a donor.';
      this.isEligible = false;
      this.formVisible = false;
    }
  }

  registerDonor(): void {
    this.dataService.registerDonor(this.donor).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = ''; 
        this.donor = {
          name: '',
          age: null,
          gender: '',
          bloodgroup: '',
          email: '',
          password: '',
          pincode: ''
        };
      },
      error: (error) => {
        this.errorMessage = 'Failed to register donor. Please try again.';
        this.successMessage = ''; 
      }
    });
  }
}
