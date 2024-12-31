import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastrModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
      ]),
    });
  }

  get emailId() {
    return this.loginForm.get('emailId');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    let { emailId, password } = this.loginForm.value;
    emailId = typeof emailId === 'string' ? emailId.trim().toLowerCase() : '';
    this.authService.login({ emailId, password }).subscribe({
      next: (response: any) => {
        this.toaster.success('Login Successful', 'Success');
        this.authService.setUser(response.data);
        this.router.navigateByUrl('/feed');
      },
      error: (error: any) => {
        if (error.status === 400) {
          this.errorMessage = error.error;
        } else {
          this.errorMessage = 'internal server error';
        }
      },
    });
  }

  navigateToSignup() {
    this.router.navigateByUrl('/signup');
  }
}
