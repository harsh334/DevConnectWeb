import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(profileId: string) {
    return this.http.get(`${environment.apiUrl}` + 'profile/view', {
      withCredentials: true,
    });
  }

  updateProfile(updatedProfileData: any) {
    return this.http.put(
      `${environment.apiUrl}` + 'profile/edit',
      updatedProfileData,
      {
        withCredentials: true,
      }
    );
  }
}
