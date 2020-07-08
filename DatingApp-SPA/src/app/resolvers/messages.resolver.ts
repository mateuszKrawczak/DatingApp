import { AuthService } from './../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@Angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../models/message';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService
      .getMessages(
        this.authService.getId(),
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      )
      .pipe(
        catchError((error) => {
          this.alertifyService.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
        })
      );
  }
}
