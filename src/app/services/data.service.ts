import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  loginUser(userData: { email: string; password: string; }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData);
  }

  registerUser(userData: { name: string; email: string; password: string; }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  getBloodBankInfo(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/blood-bank-info');
  }

    // Add to data.service.ts
  getFilteredBloodBankInfo(pincode: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/blood-bank-info/${pincode}`);
  }

  loginAdmin(adminCredentials: { email: string; password: string; }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin-login`, adminCredentials);
  }
  
  getDonors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/donors`);
  }
  
  // Method to fetch filtered donor list by blood group
  getDonorsByBloodGroup(bloodGroup: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/donors/${bloodGroup}`);
  }

  registerDonor(donorData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register-donor`, donorData);
  }
  
  // getBloodDonationCriteria(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/blood-donation-criteria`);
  // }

  getBloodDonations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/blood-donations`);
  }

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`);
  }
  
// DataService methods

  getBloodBanks(): Observable<any[]> {
    // Update this URL to match your actual API endpoint
    return this.http.get<any[]>(`${this.apiUrl}/blood-bank-info`);
  }

  getFilteredBloodBanks(pincode: string): Observable<any[]> {
    return this.http.get<any>(`http://localhost:3000/blood-bank-info/${pincode}`);
  }

  addBloodBank(bankDetails: any): Observable<any> {
    // Update this URL to match your actual API endpoint
    return this.http.post<any>(`${this.apiUrl}/add-blood-bank`, bankDetails);
  }

  addPatient(patientDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-patient`, patientDetails);
  }

  addBloodDonation(donationDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-blood-donation`, donationDetails);
  }
  
  getBloodDonationCriteria1(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blood-donation-criteria1`);
  }

  addBloodDonationCriteria(criteria: { condition: string, eligibility: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-blood-donation-criteria`, criteria);
  }

  deleteBloodBank(bbank_id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/blood-banks/${bbank_id}`);
  }
  
  deletePatient(p_id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/patients/${p_id}`);
  }

  deleteDonation(blood_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/donations/${blood_id}`);
  }

  deleteDonor(donorId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/donors/${donorId}`);
  }

  getBloodBankCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/blood-banks/count`);
  }

  getDonorCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/donors-count`);
  }

  getPatientsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/patients/count`);
  }

  getTotalBloodDonated(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/blood-donated/total`);
  }
}
