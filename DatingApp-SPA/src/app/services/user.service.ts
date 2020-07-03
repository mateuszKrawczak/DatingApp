import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  host: string = environment.host;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.host + 'api/users', {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      ),
    });
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.host + 'api/users/' + id, {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      ),
    });
  }
}
