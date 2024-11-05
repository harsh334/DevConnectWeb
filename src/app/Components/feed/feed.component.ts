import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '../../Services/connection.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {
  feedList: any[] = [];

  constructor(
    private userService: UserService,
    private connectionService: ConnectionService,
    private toaster: ToastrService
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
    this.connectionService.createConnectionRequest(status, id).subscribe({
      next: (response: any) => {
        this.feedList = this.feedList.filter((user) => user._id !== id);
        this.toaster.info(`you ${status} the profile`, ' ', { timeOut: 500 });
      },
      error: (error: any) => {
        console.error('Error in creating connection request:', error);
      },
    });
  }
}
