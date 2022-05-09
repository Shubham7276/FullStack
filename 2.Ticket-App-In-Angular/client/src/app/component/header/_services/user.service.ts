import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../_classes/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    console.log(user)
    return this.http.post("http://localhost:3000/api/auth/signup", user, {headers: headers});
  }

  
}
