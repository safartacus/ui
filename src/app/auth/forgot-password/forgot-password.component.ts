import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Şifremi Unuttum</h1>
          <p>Şifrenizi sıfırlamak için e-posta adresinizi girin</p>
        </div>

        <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" *ngIf="!isSubmitted">
          <div class="form-group">
            <label for="email">E-posta</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="ornek@email.com">
            <div class="error" *ngIf="forgotPasswordForm.get('email')?.touched && forgotPasswordForm.get('email')?.errors?.['required']">
              E-posta adresi zorunludur
            </div>
            <div class="error" *ngIf="forgotPasswordForm.get('email')?.touched && forgotPasswordForm.get('email')?.errors?.['email']">
              Geçerli bir e-posta adresi giriniz
            </div>
          </div>

          <button
            type="submit"
            class="submit-btn"
            [disabled]="!forgotPasswordForm.valid || isSubmitting">
            {{ isSubmitting ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder' }}
          </button>
        </form>

        <div class="success-message" *ngIf="isSubmitted">
          <span class="material-icons success-icon">check_circle</span>
          <h2>E-posta Gönderildi</h2>
          <p>Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.</p>
          <button
            type="button"
            class="submit-btn"
            (click)="resetForm()">
            Yeni Bağlantı Gönder
          </button>
        </div>

        <div class="auth-footer">
          <p>Şifrenizi hatırladınız mı? <a routerLink="/auth/login">Giriş Yap</a></p>
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

    input[type="email"] {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
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

    .success-message {
      text-align: center;
      padding: 1rem 0;
    }

    .success-message .material-icons {
      font-size: 3rem;
      color: #28a745;
      margin-bottom: 1rem;
    }

    .success-message h2 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .success-message p {
      margin: 0 0 1.5rem 0;
      color: #666;
    }

    .auth-footer {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
    }

    .auth-footer p {
      margin: 0;
      color: #666;
    }

    .auth-footer a {
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
    }

    .auth-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isSubmitting = true;
      // TODO: Implement forgot password logic
      console.log(this.forgotPasswordForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        // TODO: Handle success/error
      }, 2000);
    }
  }

  resetForm() {
    this.isSubmitted = false;
    this.forgotPasswordForm.reset();
  }
}
