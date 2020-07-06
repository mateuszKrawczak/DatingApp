import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host: string = environment.host;
  username= new BehaviorSubject<string>('');
  currentUsername = this.username.asObservable();
  photoUrl = new BehaviorSubject<string>('../../assets.user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl) {
    this.photoUrl.next(photoUrl);
  }
  changeUsername(username) {
    this.username.next(username);
  }
  login(userModel: any): Observable<any> {
    return this.http.post(this.host + 'api/auth/login', userModel);
  }

  loggedIn() {
    const token = localStorage.getItem('token');

    return token ? jwt_decode(token) : null;
    // return false;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  register(userModel: User): Observable<any> {
    return this.http.post(this.host + 'api/auth/register', userModel);
  }

  getUsername() {
    const token = localStorage.getItem('token');
    if (this.loggedIn()) {
      let username = jwt_decode(token).unique_name;
      return username;
    }
    return null;
  }
  getId() {
    const token = localStorage.getItem('token');
    if (this.loggedIn()) {
      let nameid = jwt_decode(token).nameid;
      return nameid;
    }
    return null;
  }
  getMainPhoto() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(user.photos !=null){
      return user.photos[0] ;
    }
    return this.currentPhotoUrl;
  }
}
