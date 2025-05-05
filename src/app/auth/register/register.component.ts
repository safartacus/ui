import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Kayıt Ol</h1>
          <p>Yeni bir hesap oluşturarak başlayın</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Ad Soyad</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              placeholder="Adınız ve soyadınız">
            <div class="error" *ngIf="registerForm.get('name')?.touched && registerForm.get('name')?.errors?.['required']">
              Ad soyad zorunludur
            </div>
          </div>

          <div class="form-group">
            <label for="email">E-posta</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="ornek@email.com">
            <div class="error" *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.errors?.['required']">
              E-posta adresi zorunludur
            </div>
            <div class="error" *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.errors?.['email']">
              Geçerli bir e-posta adresi giriniz
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              formControlName="phone"
              placeholder="05XX XXX XX XX">
            <div class="error" *ngIf="registerForm.get('phone')?.touched && registerForm.get('phone')?.errors?.['required']">
              Telefon numarası zorunludur
            </div>
            <div class="error" *ngIf="registerForm.get('phone')?.touched && registerForm.get('phone')?.errors?.['pattern']">
              Geçerli bir telefon numarası giriniz
            </div>
          </div>

          <div class="form-group">
            <label for="password">Şifre</label>
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
                <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            <div class="error" *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.errors?.['required']">
              Şifre zorunludur
            </div>
            <div class="error" *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.errors?.['minlength']">
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
                <i class="fas" [class.fa-eye]="!showConfirmPassword" [class.fa-eye-slash]="showConfirmPassword"></i>
              </button>
            </div>
            <div class="error" *ngIf="registerForm.get('confirmPassword')?.touched && registerForm.get('confirmPassword')?.errors?.['required']">
              Şifre tekrarı zorunludur
            </div>
            <div class="error" *ngIf="registerForm.get('confirmPassword')?.touched && registerForm.get('confirmPassword')?.errors?.['passwordMismatch']">
              Şifreler eşleşmiyor
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="terms">
              <span>Kullanım koşullarını ve gizlilik politikasını kabul ediyorum</span>
            </label>
            <div class="error" *ngIf="registerForm.get('terms')?.touched && registerForm.get('terms')?.errors?.['required']">
              Kullanım koşullarını kabul etmelisiniz
            </div>
          </div>

          <button
            type="submit"
            class="submit-btn"
            [disabled]="!registerForm.valid || isSubmitting">
            {{ isSubmitting ? 'Kayıt yapılıyor...' : 'Kayıt Ol' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Zaten hesabınız var mı? <a routerLink="/auth/login">Giriş Yap</a></p>
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

    input[type="text"],
    input[type="email"],
    input[type="tel"],
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
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      cursor: pointer;
      font-weight: normal;
    }

    .checkbox-label input[type="checkbox"] {
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
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
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
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      // TODO: Implement register logic
      console.log(this.registerForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        // TODO: Handle register success/error
      }, 2000);
    }
  }
}
