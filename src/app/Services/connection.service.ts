import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getConnections() {
    return this.http.get(`${environment.apiUrl}` + 'user/connections', {
      withCredentials: true,
    });
  }

  getConnectionRequests() {
    return this.http.get(
      `${environment.apiUrl}` + 'user/connections/requests',
      {
        withCredentials: true,
      }
    );
  }

  reviewConnectionRequest(status: string, requestId: string) {
    return this.http.put(
      `${environment.apiUrl}` + 'connection/review/' + status + '/' + requestId,
      null,
      { withCredentials: true }
    );
  }

  createConnectionRequest(status: string, id: string) {
    return this.http.post(
      `${environment.apiUrl}` + 'connection/send/' + status + '/' + id,
      null,
      { withCredentials: true }
    );
  }
}
