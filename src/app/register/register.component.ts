import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hidePassword = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }
  onRegister() {
    const { username, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      alert('Password not match');
      return;
    }

    this.authService.register(username, password).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Error : ' + err.error.message);
      }
    });
  }
}
