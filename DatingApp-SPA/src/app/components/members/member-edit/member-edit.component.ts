import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  user: User;
  editForm: FormGroup;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.data.subscribe((d) => {
      this.user = d['user'];
    });
    this.editForm = this.fb.group({
      introduction: [this.user.introduction],
      lookingFor: [this.user.lookingFor],
      interests: [this.user.interests],
      city: [this.user.city, Validators.required],
      country: [this.user.country, Validators.required],
    });
  }

  updateUser() {
    Object.assign(this.user, this.editForm.value);
    this.userService
      .updateUser(this.authService.getId(), this.user)
      .subscribe((next) => {
        this.alertifyService.success('Profile updated successfully');
        this.editForm.reset(this.user);
      },e=>{
        this.alertifyService.warning("Error");
      });
  }
}
