import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
