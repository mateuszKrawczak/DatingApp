import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  register(){
    this.userToRegister = this.registerForm.value;
    console.log(this.userToRegister)
    this.authService.register(this.userToRegister).subscribe(next=>{
      console.log("Resgistration successful"); 
    }, error=>{
      console.log("Error");
    });
  }
  cancel(){
    this.registerModeChange.emit();
  }
}
