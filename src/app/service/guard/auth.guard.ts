import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from '../keyclock.service';

export const authGuard: CanActivateFn = async () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  try {
    // Ensure we have a valid token
    const isAuthenticated = await keycloakService.instance.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
    });

    if (!isAuthenticated || keycloakService.instance.isTokenExpired()) {
      await keycloakService.login();
      return false;
    }
    return true;
  } catch (error) {
    console.error('Authentication check failed', error);
    router.navigate(['/login']);
    return false;
  }
};