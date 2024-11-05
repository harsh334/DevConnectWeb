import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AuthService } from './Services/auth.service';
import { ProfileService } from './Services/profile.service';
import { IUserProfile } from './Models/IUserProfile';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'DevConnectWeb';
  constructor(private authService: AuthService, private router: Router) {
    console.log('construvctor');
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.getLoggedInUser().subscribe({
        next: (response: IUserProfile) => {
          this.authService.setUser(response.data);
        },
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
