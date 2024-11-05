import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ISignupBody } from '../../Models/ISignupBody';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  selectedImage: any = '';
  base64Image: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    age: new FormControl('', [Validators.required, Validators.min(13)]),
    about: new FormControl('', [Validators.required]),
    skills: new FormControl([]),
  });

  skillsOptions: string[] = [
    'JavaScript',
    'TypeScript',
    'Angular',
    'Node.js',
    'React',
  ];

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const base64Image = canvas.toDataURL('image/jpeg', 0.5);
        this.base64Image = base64Image;
      };
    };
  }

  signup(body: ISignupBody) {
    if (this.signupForm.valid) {
      body.profileImage = this.base64Image;
      console.log('bodyy', body);
      this.authService.signup(body).subscribe({
        next: (response: any) => {
          console.log('response', response);
          this.navigateToLogin();
        },
        error: (error: any) => {
          console.log('error', error);
        },
      });
      console.log('Signup data:', this.signupForm.value);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
