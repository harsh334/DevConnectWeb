import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  try {
    const user = await firstValueFrom(authService.getLoggedInUser());
    return true;
  } catch (error) {
    router.navigateByUrl('/login');
    return false;
  }
};
