import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '../../Services/connection.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  feedList: any[] = [];
  animationState: 'enter' | 'leave' = 'enter';

  constructor(
    private userService: UserService,
    private connectionService: ConnectionService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.userService.getFeed().subscribe({
      next: (response: any) => {
        this.feedList = response.data;
      },
    });
  }

  onCreateConnection(status: string, id: string) {
    this.animationState = 'leave'; // Trigger leave animation
    this.connectionService.createConnectionRequest(status, id).subscribe({
      next: () => {
        this.toaster.info(`You ${status} the profile`, '', { timeOut: 500 });
      },
      error: (error: any) => {
        console.error('Error in creating connection request:', error);
      },
    });
  }

  onAnimationEnd() {
    if (this.animationState === 'leave') {
      this.feedList.shift(); // Remove the first card after the animation ends
      this.animationState = 'enter'; // Trigger enter animation for the next card
    }
  }

  navigateTo(route: string, id: string) {
    this.router.navigate([route, id]);
  }
}
