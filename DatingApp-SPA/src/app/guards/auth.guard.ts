import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private alertifService:AlertifyService, private router:Router, private authService:AuthService) {
    
  }
  canActivate(): boolean{
    if(this.authService.loggedIn()){
      return true;
    }
    this.alertifService.error('You shall not pass!')
    this.router.navigate(['/home']);
    return false;
  }
  
}
