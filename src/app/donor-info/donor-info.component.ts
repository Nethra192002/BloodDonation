// donor-info.component.ts

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-donor-info',
  templateUrl: './donor-info.component.html',
  styleUrls: ['./donor-info.component.css']
})
export class DonorInfoComponent implements OnInit {
  patients: any[] = []; // This will hold the patient data

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
}
