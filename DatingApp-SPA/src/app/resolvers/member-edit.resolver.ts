import { AuthService } from './../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Resolve } from '@Angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService,
    private authService:AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.getId()).pipe(
        catchError(error=>{
            this.alertifyService.error("Problem retrieving your data");
            this.router.navigate(['/members']);
            return of(null);
        })
    );
  }
}
