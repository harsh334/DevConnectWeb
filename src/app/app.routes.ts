import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { authGuard } from './Guards/auth.guard';
import { FeedComponent } from './Components/feed/feed.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { ConnectionComponent } from './Components/connection/connection.component';
import { ConnectionRequestsComponent } from './Components/connection-requests/connection-requests.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'profile/:profileId',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  { path: 'feed', component: FeedComponent, canActivate: [authGuard] },
  { path: 'edit', component: EditProfileComponent, canActivate: [authGuard] },
  {
    path: 'connection',
    component: ConnectionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'connectionRequests',
    component: ConnectionRequestsComponent,
    canActivate: [authGuard],
  },
];
