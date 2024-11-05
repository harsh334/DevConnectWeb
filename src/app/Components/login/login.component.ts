import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      emailId: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    const { emailId, password } = this.loginForm.value;
    this.authService.login({ emailId, password }).subscribe({
      next: (response: any) => {
        console.log('result', response);
        this.toaster.success('Login Successful', 'Success');
        this.authService.setUser(response.data);
        this.router.navigateByUrl('/feed');
      },
      error: (error: any) => {
        console.log('error', error);
      },
    });
  }

  navigateToSignup() {
    this.router.navigateByUrl('/signup');
  }
}
