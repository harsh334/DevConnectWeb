import { Component } from '@angular/core';
import { ConnectionService } from '../../Services/connection.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-connection-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connection-requests.component.html',
  styleUrl: './connection-requests.component.css',
})
export class ConnectionRequestsComponent {
  connectionRequests: any[] = [];
  constructor(
    private connectionService: ConnectionService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getConnectionRequests();
  }

  getConnectionRequests() {
    this.connectionService.getConnectionRequests().subscribe({
      next: (response: any) => {
        this.connectionRequests = response.data;
      },
    });
  }

  reviewConnectionRequest(status: string, requestId: string) {
    this.connectionService
      .reviewConnectionRequest(status, requestId)
      .subscribe({
        next: (response: any) => {
          this.toaster.info(`connection request ${status}`, ' ', {
            timeOut: 500,
          });
          this.connectionRequests = this.connectionRequests.filter(
            (connectionRequest: any) => connectionRequest._id !== requestId
          );
        },
      });
  }
}
