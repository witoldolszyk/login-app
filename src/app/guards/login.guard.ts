import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const LoginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
