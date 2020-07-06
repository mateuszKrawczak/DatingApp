import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() registerModeChange = new EventEmitter();
  registerForm: FormGroup;
  userToRegister: User;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        gender: ['male'],
        username: [null, Validators.required],
        knownAs: [null, Validators.required],
        dateOfBirth: [null, Validators.required],
        city: [null, Validators.required],
        country: [null, Validators.required],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: [null],
      },
      { validator: this.passwordMatchValidator }
    );
    this.bsConfig = {
      containerClass: 'theme-red',
    };
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }
  register() {
    if (this.registerForm.valid) {
      this.userToRegister = Object.assign({}, this.registerForm.value);
      this.registerForm.reset();
      console.log(this.userToRegister);
      this.authService.register(this.userToRegister).subscribe(
        (next) => {
          this.alertifyService.success('Resgistration successful');
          this.authService.login(this.userToRegister).subscribe((data) => {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            let photoUrl = this.authService.getMainPhoto()
            this.authService.changeMemberPhoto(photoUrl);
            this.router.navigate(['/members']);
          });
        },
        (error) => {
          this.alertifyService.error('Incorrect data');
        }
      );
    }
  }
  cancel() {
    this.registerModeChange.emit();
  }
}
