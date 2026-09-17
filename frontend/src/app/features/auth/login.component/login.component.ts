import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../shared/interfaces/auth/login.request.interface';
import { Auth } from '../../../shared/services/auth.service';
import { AuthSessionService } from '../../../core/auth/auth-session.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    FormsModule
  ],
  selector: 'app-login.component',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(Auth)
  private readonly session = inject(AuthSessionService)
  private readonly router = inject(Router)

  public email = ''
  public password = ''
  public errors_back = signal<string[]>([])
  public loading = signal(false)

  login() {
    this.loading.set(true)
    this.errors_back.set([])
    const req: LoginRequest = { 
      email: this.email,
      password: this.password 
    };

    this.authService.login(req).subscribe({
      next: (res) => {
        this.session.saveToken(res.data)
        this.router.navigate([this.session.getDashboard()])
      },
      error: (err) => {
        this.loading.set(false);
        this.errors_back.set(err.error?.errors ?? [err.error?.message ?? 'Credenciales inválidas']);
      },
    });
  }
}