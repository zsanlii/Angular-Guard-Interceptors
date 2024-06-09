import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AUTH_ERROR_REDIRECT_URL_TOKEN } from '../providers/auth.provider';

// Guard: Routing mekanizmasındaki çeşitli olaylarına müdahale etmek için kullanılır. 4 türdür.
// CanActive: Route'a erişim izni verilip verilmeyeceğini belirler.
// CanActiveChild: Child Route'ların erişim izni verilip verilmeyeceğini belirler.
// CanDeactivate: Route'dan ayrılmadan önce kullanıcıya bir onay verme şansı verir.
// CanMatch: Route'ın path'inin eşleşip eşleşmediğini belirler.

export const routeDataKey = 'securedRoute';
export interface SecuredRoute {
  reqiredRoleIds: number[];
}

export const securedRouteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authErrorRedirectUrl = inject(AUTH_ERROR_REDIRECT_URL_TOKEN);
  // constructor
  // @Inject(AUTH_ERROR_REDIRECT_URL) private authErrorRedirectUrl: string

  if (!authService.isAuthenticated) {
    router.navigateByUrl(authErrorRedirectUrl);
    return false;
  }

  if (route.data[routeDataKey]) {
    const { requiredRoleIds } = route.data[routeDataKey];
    if (!authService.isAuthorized(requiredRoleIds)) {
      router.navigateByUrl(authErrorRedirectUrl);
      return false;
    }
  }

  return true; // true dönüldüğünde route izin verilir, false dönüldüğünde route engellenir
};
