import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(profileId: string) {
    return this.http.get('http://localhost:3000/profile/view', {
      withCredentials: true,
    });
  }

  updateProfile(updatedProfileData: any) {
    return this.http.put(
      'http://localhost:3000/profile/edit',
      updatedProfileData,
      {
        withCredentials: true,
      }
    );
  }
}
