import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() registerModeChange = new EventEmitter();
  registerForm: FormGroup;
  userToRegister: User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertifyService:AlertifyService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  register(){
    this.userToRegister = this.registerForm.value;
    this.registerForm.reset();
    this.authService.register(this.userToRegister).subscribe(next=>{
      this.alertifyService.success("Resgistration successful"); 
    }, error=>{
      this.alertifyService.error("Incorrect data");
    });
  }
  cancel(){
    this.registerModeChange.emit();
  }
}
