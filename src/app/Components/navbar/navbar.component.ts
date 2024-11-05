import { Component, Input } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: any = '';
  menuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe((response: any) => {
      if (response) {
        this.user = response;
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(route: string) {
    if (route === 'profile') {
      this.router.navigate([`/${route}`, this.user._id]);
    } else {
      this.router.navigate([`/${route}`]);
    }
    this.menuOpen = false;
  }

  logout() {
    let isLoggedOut = this.authService.logout().subscribe({
      next: () => {
        this.user = '';
        this.navigateTo('/login');
        this.toaster.warning('Logout success', 'Success');
      },
    });
  }
}
