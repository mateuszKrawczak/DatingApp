import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  userForm: FormGroup;
  userToLogin: User;
  usernameModel:string=""
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertifyService:AlertifyService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    if(this.loggedIn()){
      this.usernameModel=this.authService.getUsername();
    }
  }

  login() {
    this.userToLogin = this.userForm.value;
    this.userForm.reset();
    this.authService.login(this.userToLogin).subscribe(data=>{
      localStorage.setItem('token',data.token);
      this.usernameModel=this.authService.getUsername();
      this.alertifyService.success("Logged in successfully"); 
    }, error=>{
      this.alertifyService.error("Incorrect data");
    });
  }
  loggedIn(){
    return this.authService.loggedIn();
  }
  logout(){
    this.authService.logout();
  }
}
