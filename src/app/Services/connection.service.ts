import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getConnections() {
    return this.http.get('http://localhost:3000/user/connections', {
      withCredentials: true,
    });
  }

  getConnectionRequests() {
    return this.http.get('http://localhost:3000/user/connections/requests', {
      withCredentials: true,
    });
  }

  reviewConnectionRequest(status: string, requestId: string) {
    return this.http.put(
      'http://localhost:3000/connection/review/' + status + '/' + requestId,
      null,
      { withCredentials: true }
    );
  }

  createConnectionRequest(status: string, id: string) {
    return this.http.post(
      'http://localhost:3000/connection/send/' + status + '/' + id,
      null,
      { withCredentials: true }
    );
  }
}
