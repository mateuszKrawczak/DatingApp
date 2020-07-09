import { Message } from './../models/message';
import { PaginatedResult } from './../models/pagination';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  host: string = environment.host;

  constructor(private http: HttpClient) {}

  getUsers(
    page?,
    itemsPerPage?,
    userParams?,
    likesParam?
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<
      User[]
    >();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likesParam === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this.http
      .get<User[]>(this.host + 'api/users', {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          paginatedResult.result = res.body;
          if (res.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              res.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.host + 'api/users/' + id, {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      ),
    });
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(this.host + 'api/users/' + id, user, {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      ),
    });
  }

  sendLike(id: number, recpientId: number): Observable<any> {
    return this.http.post(
      this.host + 'api/users/' + id + '/like/' + recpientId,
      {},
      {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      }
    );
  }

  getMessages(
    id: number,
    page?,
    itemsPerPage?,
    messageContainer?
  ): Observable<PaginatedResult<Message[]>> {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Message[]>(this.host + 'api/users/' + id + '/messages', {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          paginatedResult.result = res.body;
          if (res.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              res.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getMessagesThread(id: number, recipientId: number): Observable<Message[]> {
    return this.http.get<Message[]>(
      this.host + 'api/users/' + id + '/messages/thread/' + recipientId,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      }
    );
  }
  sendMessage(id: number, message: Message): Observable<Message> {
    return this.http.post<Message>(
      this.host + 'api/users/' + id + '/messages',
      message,
      {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      }
    );
  }

  deleteMessage(id: number, userId: number): Observable<any> {
    return this.http.post(
      this.host + 'api/users/' + userId + '/messages/' + id,
      {},
      {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      }
    );
  }

  markAsRead(userId: number, messageId: number):Observable<any> {
    return this.http.post(
      this.host + 'api/users/' + userId + '/messages/' + messageId + '/read',
      {},
      {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      }
    );
  }
}
