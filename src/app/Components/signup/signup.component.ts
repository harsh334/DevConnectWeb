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
import { ToastrService } from 'ngx-toastr';
import { checkIfEmpty } from '../../Utils/validators';

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
  skillsOptions: string[] = [
    'JavaScript',
    'Python',
    'Java',
    'HTML',
    'CSS',
    'SQL',
    'React',
    'Angular',
    'Node.js',
    'TypeScript',
    'Git',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'Google Cloud',
    'MySQL',
    'MongoDB',
    'PostgreSQL',
    'Redis',
    'GraphQL',
    'REST APIs',
    'CI/CD',
    'Jenkins',
    'Agile',
    'Scrum',
    'JSON',
    'XML',
    'Bash',
    'Linux',
    'Ruby',
    'PHP',
    'C++',
    'C#',
    'Swift',
    'Kotlin',
    'Objective-C',
    'Rust',
    'Go',
    'Terraform',
    'Ansible',
    'Machine Learning',
    'Data Science',
    'AI',
    'TensorFlow',
    'PyTorch',
    'Pandas',
    'NumPy',
    'D3.js',
    'Selenium',
    'Figma',
    'UX/UI Design',
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      checkIfEmpty,
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    age: new FormControl('', [Validators.required, Validators.min(13)]),
    about: new FormControl('', [Validators.required]),
    profileImage: new FormControl('', [Validators.required]),
    skills: new FormControl([], [Validators.required]),
  });

  checkIfEmpty() {}

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get emailId() {
    return this.signupForm.get('emailId');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get profileImage() {
    return this.signupForm.get('profileImage');
  }

  get age() {
    return this.signupForm.get('age');
  }

  get about() {
    return this.signupForm.get('about');
  }

  get skills() {
    return this.signupForm.get('skills');
  }

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
      this.authService.signup(body).subscribe({
        next: (response: any) => {
          this.toaster.success('Form submitted successfully');
          this.navigateToLogin();
        },
        error: (error: any) => {
          this.toaster.error('unexpected errro occured, please try again');
        },
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
