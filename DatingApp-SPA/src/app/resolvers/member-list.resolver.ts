import { AlertifyService } from '../services/alertify.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Resolve } from '@Angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  pageNumber = 1;
  pageSize = 5;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
      catchError((error) => {
        this.alertifyService.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
