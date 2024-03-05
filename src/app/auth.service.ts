// AuthService

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:5000'; // Your Flask API URL

  constructor(private http: HttpClient) {}

  loginUser(user: User): Observable<any> { // Renamed from login to loginUser
    return this.http.post(`${this.apiURL}/login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }
}
