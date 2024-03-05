import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list-recipients',
  templateUrl: './list-recipients.component.html',
  styleUrls: ['./list-recipients.component.css']
})
export class ListRecipientsComponent implements OnInit {

  patients: any[] = []; // This will hold the patient data
  showAddForm: boolean = false;
  newPatient = { p_id: '', pname: '', blood_group: '', age: null, contact: '' };
  successMessage: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (error) => {
        console.error('Error fetching patients', error);
      }
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    
  }

  addPatient() {
    if (this.newPatient.p_id && this.newPatient.pname && this.newPatient.blood_group && this.newPatient.age && this.newPatient.contact) {
      this.dataService.addPatient(this.newPatient).subscribe({
        next: () => {
          this.patients.push(this.newPatient); // Add to the list (or you may want to fetch the list again)
          this.toggleAddForm(); // Hide the form
          this.successMessage = 'Patient added successfully';
          this.newPatient = { p_id: '', pname: '', blood_group: '', age: null, contact: '' }; // Reset the form
          setTimeout(() => this.successMessage = '', 3000); // Clear message after 3 seconds
        },
        error: (error) => {
          console.error('Failed to add patient', error);
        }
      });
    } else {
      alert('All fields are required!');
    }
  }

  deletePatient(p_id: number) {
    this.dataService.deletePatient(p_id).subscribe({
      next: () => {
        this.patients = this.patients.filter(patient => patient.p_id !== p_id);
        this.successMessage = 'Patient deleted successfully';
        this.ngOnInit(); // Refresh the list after deletion
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        console.error('Error deleting patient', error);
        // Handle the error, display message to user
      }
    });
  }
}
