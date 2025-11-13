import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (res: any) => {
        if (res.token.access_token.token) {
          localStorage.setItem('token', res.token.access_token.token);
          localStorage.setItem('username', JSON.stringify({ username }));
          alert('Login success!');
          this.router.navigate(['/profile']);
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        alert('Error: ' + err.error.message);
      }
    });
  }
  ngOnInit(): void {
  }

}
