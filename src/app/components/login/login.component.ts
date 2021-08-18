import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';

  errorMessage: string = '';

  loginForm: FormGroup;

  constructor(private _router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    if (localStorage.getItem('id')) {
      this._router.navigate(['companies']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }

  doLogin() {
    this.errorMessage = '';
    this.loginService
      .getUsers()
      .pipe(take(1))
      .subscribe((users) => {
        let isUserValid = false;
        for (let user of users) {
          if (user.email === this.loginForm.value.email) {
            localStorage.setItem('id', user.id);
            isUserValid = true;
            break;
          }
        }
        if (isUserValid) {
          this._router.navigate(['companiesAndContacts']);
        } else {
          this.errorMessage = 'Email or password are incorrect';
        }
      });
  }
}
