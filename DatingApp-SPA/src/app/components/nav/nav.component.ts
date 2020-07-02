import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  userForm: FormGroup;
  userToLogin: User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    this.userToLogin = this.userForm.value;
    this.authService.login(this.userToLogin).subscribe(data=>{
      localStorage.setItem('token',data.token);
      console.log("Logged in successfully"); 
    }, error=>{
      console.log("Error");
    });
  }
  loggedIn(){
    return this.authService.loggedIn();
  }
  logout(){
    this.authService.logout();
  }
}
