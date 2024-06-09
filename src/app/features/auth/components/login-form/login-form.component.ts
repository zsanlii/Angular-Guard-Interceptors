import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/login-credentials';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  loginFormGroup: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthService) {
    this.loginFormGroup = formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const loginCredentials: LoginCredentials = {
      userName: this.loginFormGroup.value.userName,
      password: this.loginFormGroup.value.password,
    };
    this.authService.login(loginCredentials).subscribe({
      complete: () => {
        this.loginSuccess.emit();
      },
    });
  }

  onLoginFormSubmit() {
    if (this.loginFormGroup.invalid) {
      console.error('Invalid form');
      return;
    }

    this.login();
  }
}
