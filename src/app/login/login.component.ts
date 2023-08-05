import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  form: FormGroup;

  constructor(private loginService: LoginService, private fb:FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  login() {
    const {email, password} = this.form.value;
    this.loginService.login(email, password).subscribe(
      () => {
        this.router.navigateByUrl("/students")
      }
    )
  
  }

}
