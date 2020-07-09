import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.getId();
    this.userService
      .getMessagesThread(this.authService.getId(), this.recipientId)
      .pipe(
        tap((messages) => {
          messages.forEach((message) => {
            if (
              message.isRead === false &&
              message.recipientId === currentUserId
            ) {
              this.userService.markAsRead(currentUserId, message.id).subscribe();
            }
          });
        })
      )
      .subscribe(
        (mes) => {
          this.messages = mes;
        },
        (error) => {
          this.alertifyService.error(error.error);
        }
      );
  }
  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.getId(), this.newMessage)
      .subscribe(
        (m: Message) => {
          this.messages.unshift(m);
          this.newMessage.content = '';
        },
        (error) => {
          this.alertifyService.error(error.error);
        }
      );
  }
}
