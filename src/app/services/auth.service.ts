import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/`, user);
  }

  login(user: User): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users?email=${user.email}&password=${user.password}`);
  }
}
