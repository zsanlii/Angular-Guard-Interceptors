import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginFormComponent } from '../../../features/auth/components/login-form/login-form.component';

@Component({
  standalone: true,
  imports: [
    // CommonModule,
    RouterLink,
    // BasicLayoutComponent
    LoginFormComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  now = new Date();

  constructor(private router: Router) {}

  onLoginSuccess() {
    this.router.navigate(['/']);
  }
}
