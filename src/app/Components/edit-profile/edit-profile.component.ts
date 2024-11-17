import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../Services/profile.service';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent {
  editProfileForm!: FormGroup;
  profile!: any;
  previewImage: string | ArrayBuffer | null = null;
  base64Image: string = '';
  selectedImage: any = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadUserProfile();
  }

  initializeForm() {
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      skills: ['', Validators.required],
      about: ['', Validators.required],
      profileImage: [''],
    });

    this.editProfileForm.valueChanges.subscribe((updatedValues) => {
      this.profile = { ...this.profile, ...updatedValues };
    });
  }

  loadUserProfile() {
    this.authService.getLoggedInUser().subscribe({
      next: (response: any) => {
        this.profile = response.data;
        this.editProfileForm.patchValue(this.profile);
        this.previewImage = this.profile?.profileImage || null;
      },
      error: (error) => console.log('Error fetching profile:', error),
    });
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
        this.base64Image = canvas.toDataURL('image/jpeg', 0.5);

        // Update form control and preview image
        this.editProfileForm.patchValue({ profileImage: this.base64Image });
        this.previewImage = this.base64Image;
      };
    };
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      this.profileService.updateProfile(this.editProfileForm.value).subscribe({
        next: () => {
          this.toaster.success('Profile edited successfully');
        },
        error: (error) => console.log('Error updating profile:', error),
      });
    }
  }
}
