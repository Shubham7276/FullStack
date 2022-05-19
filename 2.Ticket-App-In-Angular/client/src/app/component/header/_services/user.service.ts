import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../_classes/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api="http://localhost:3000/api/auth/signup";
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post(`${this.api}`, user, {headers: headers});
  }

  
}
