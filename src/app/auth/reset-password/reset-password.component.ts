import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Şifre Sıfırlama</h1>
          <p>Yeni şifrenizi belirleyin</p>
        </div>

        <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()" *ngIf="!isSubmitted">
          <div class="form-group">
            <label for="password">Yeni Şifre</label>
            <div class="password-input">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                formControlName="password"
                placeholder="••••••••">
              <button
                type="button"
                class="toggle-password"
                (click)="togglePassword()">
                <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
            <div class="error" *ngIf="resetPasswordForm.get('password')?.touched && resetPasswordForm.get('password')?.errors?.['required']">
              Şifre zorunludur
            </div>
            <div class="error" *ngIf="resetPasswordForm.get('password')?.touched && resetPasswordForm.get('password')?.errors?.['minlength']">
              Şifre en az 6 karakter olmalıdır
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Şifre Tekrar</label>
            <div class="password-input">
              <input
                [type]="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                formControlName="confirmPassword"
                placeholder="••••••••">
              <button
                type="button"
                class="toggle-password"
                (click)="toggleConfirmPassword()">
                <span class="material-icons">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
            <div class="error" *ngIf="resetPasswordForm.get('confirmPassword')?.touched && resetPasswordForm.get('confirmPassword')?.errors?.['required']">
              Şifre tekrarı zorunludur
            </div>
            <div class="error" *ngIf="resetPasswordForm.get('confirmPassword')?.touched && resetPasswordForm.get('confirmPassword')?.errors?.['passwordMismatch']">
              Şifreler eşleşmiyor
            </div>
          </div>

          <button
            type="submit"
            class="submit-btn"
            [disabled]="!resetPasswordForm.valid || isSubmitting">
            {{ isSubmitting ? 'Şifre Sıfırlanıyor...' : 'Şifreyi Sıfırla' }}
          </button>
        </form>

        <div class="success-message" *ngIf="isSubmitted">
          <span class="material-icons success-icon">check_circle</span>
          <h2>Şifre Başarıyla Sıfırlandı</h2>
          <p>Yeni şifreniz başarıyla kaydedildi. Şimdi giriş yapabilirsiniz.</p>
          <button
            type="button"
            class="submit-btn"
            routerLink="/auth/login">
            Giriş Yap
          </button>
        </div>

        <div class="error-message" *ngIf="isError">
          <span class="material-icons error-icon">error</span>
          <h2>Hata Oluştu</h2>
          <p>{{ errorMessage }}</p>
          <button
            type="button"
            class="submit-btn"
            (click)="resetForm()">
            Tekrar Dene
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: #f8f9fa;
    }

    .auth-card {
      width: 100%;
      max-width: 400px;
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .auth-header h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .auth-header p {
      margin: 0;
      color: #666;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    input[type="password"] {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .password-input {
      position: relative;
    }

    .toggle-password {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .material-icons {
      font-size: 1.25rem;
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .submit-btn:hover {
      background: #0056b3;
    }

    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .success-message,
    .error-message {
      text-align: center;
      padding: 1rem 0;
    }

    .success-message i {
      font-size: 3rem;
      color: #28a745;
      margin-bottom: 1rem;
    }

    .error-message i {
      font-size: 3rem;
      color: #dc3545;
      margin-bottom: 1rem;
    }

    .success-message h2,
    .error-message h2 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .success-message p,
    .error-message p {
      margin: 0 0 1.5rem 0;
      color: #666;
    }

    .success-message .material-icons,
    .error-message .material-icons {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .success-message .material-icons {
      color: #28a745;
    }

    .error-message .material-icons {
      color: #dc3545;
    }
  `]
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;
  isSubmitted = false;
  isError = false;
  errorMessage = '';
  token = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.isError = true;
        this.errorMessage = 'Geçersiz veya eksik şifre sıfırlama bağlantısı.';
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.isSubmitting = true;
      // TODO: Implement reset password logic with token
      console.log({
        token: this.token,
        ...this.resetPasswordForm.value
      });
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        // TODO: Handle success/error
      }, 2000);
    }
  }

  resetForm() {
    this.isError = false;
    this.errorMessage = '';
    this.resetPasswordForm.reset();
  }
}
