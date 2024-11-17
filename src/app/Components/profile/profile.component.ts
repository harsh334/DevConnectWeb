import { Component } from '@angular/core';
import { ProfileService } from '../../Services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileId!: string;
  profile: any = {};
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('profileId') || '';
    this.profileService.getProfile(this.profileId).subscribe({
      next: (response: any) => {
        this.profile = response.data;
      },
      error: (error: any) => {
        console.log('error' + error.message);
      },
    });
  }
}
