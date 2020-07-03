import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users:User[]
  constructor(private userService:UserService, private alertifyService:AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.users = data['users'];
    })
  }
  // loadUsers() {
  //   this.userService.getUsers().subscribe(users =>{
  //     this.users = users;
  //   }, error=>{
  //     this.alertifyService.error("Failed to load users");
  //   })
  // }

}