import { Component } from '@angular/core';
import { ConnectionService } from '../../Services/connection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.css',
})
export class ConnectionComponent {
  connections: any[] = [];
  constructor(private connectionService: ConnectionService) {}
  ngOnInit() {
    this.getConnections();
  }
  getConnections() {
    this.connectionService.getConnections().subscribe({
      next: (response: any) => {
        this.connections = response.data;
      },
    });
  }
}
