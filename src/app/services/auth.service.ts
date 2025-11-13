import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5229/api/login/user';
  constructor(private http: HttpClient) { }
  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/register`, body);
  }
  login(username: string, password: string) {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}/login`, body);
  }
  getProfile() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.baseUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
