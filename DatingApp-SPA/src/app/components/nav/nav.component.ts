import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  userForm: FormGroup;
  userToLogin: User;
  usernameModel: string = '';
  photoUrl: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.usernameModel = this.authService.getUsername();
    // this.authService.currentUsername.subscribe((usernameModel)=>{
    //  this.usernameModel = usernameModel;
    // });
    if (this.authService.loggedIn()) {
      this.authService.currentPhotoUrl.subscribe(
     (photoUrl) => (this.photoUrl = photoUrl)
      );
     if(this.authService.loggedIn())
     this.photoUrl = this.getMainPhoto();
     this.usernameModel =this.authService.getUsername();
    }
  }

  login() {
    this.userToLogin = this.userForm.value;
    this.userForm.reset();
    this.authService.login(this.userToLogin).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        this.usernameModel = this.authService.getUsername();
        this.router.navigate(['/members']);
        this.alertifyService.success('Logged in successfully');
        this.photoUrl = this.getMainPhoto();
        this.authService.changeMemberPhoto(this.photoUrl);
        this.usernameModel = this.authService.getUsername();
      },
      (error) => {
        this.alertifyService.error('Incorrect data');
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  getMainPhoto() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return user.photoUrl;
  }
}
