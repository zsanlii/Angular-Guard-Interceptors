import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { MyAccountPageComponent } from './my-account-page/my-account-page.component';
import { AdminPanelPageComponent } from './admin-panel-page/admin-panel-page.component';
import {
  securedRouteGuard
} from '../../core/auth/guards/secured-route.guard';
import { AuthRoles } from '../../features/auth/constants/auth-roles';

export const authRoutes: Routes = [
  {
    path: 'auth/login',
    component: LoginPageComponent,
  },
  {
    path: 'my-account',
    canActivate: [securedRouteGuard],
    component: MyAccountPageComponent,
  },
  {
    path: 'admin-panel',
    data: {
      securedRoute: {
        requiredRoleIds: [AuthRoles.Admin],
      },
    },
    canActivate: [securedRouteGuard],
    component: AdminPanelPageComponent,
  },
];
