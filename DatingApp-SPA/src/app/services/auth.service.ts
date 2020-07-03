import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host: string = environment.host;
  constructor(private http: HttpClient) {}

  login(userModel: any): Observable<any> {
    return this.http.post(this.host + 'api/auth/login', userModel)
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    
    return token ? jwt_decode(token) : null;
   // return false;
  }
  logout(){
    localStorage.removeItem('token');
  }
  register(userModel:User):Observable<any>{
    return this.http.post(this.host+'api/auth/register',userModel);
  }

  getUsername(){
    const token = localStorage.getItem('token');
    if(this.loggedIn()){
      let username = jwt_decode(token).unique_name;
      return username;
    }
    return null;
  }
}
