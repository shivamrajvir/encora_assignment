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
  username: string = '';

  errorMessage: string = '';

  loginForm: FormGroup;

  constructor(private _router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    let userType = localStorage.getItem('type');
    if (userType === 'admin') {
      this._router.navigate(['noticeForAdmin']);
    } else if (userType === 'student') {
      this._router.navigate(['noticeForStudents']);
    }
    // else {
      this.loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      });
    // }
  }

  doLogin() {
    this.errorMessage = '';
    this.loginService
      .getUsers()
      .pipe(take(1))
      .subscribe((users) => {
        let isUserValid = false;
        for (let user of users) {
          if (user.name === this.loginForm.value.username) {
            localStorage.setItem('type', user.type);
            isUserValid = true;
            break;
          }
        }
        if (isUserValid) {
          if (localStorage.getItem('type') === 'admin') {
            this._router.navigate(['noticeForAdmin']);
          } else {
            this._router.navigate(['noticeForStudents']);
          }
        } else {
          this.errorMessage = 'username or password are incorrect';
        }
      });
  }
}
