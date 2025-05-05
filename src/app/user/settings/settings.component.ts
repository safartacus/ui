import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="settings-container">
      <div class="settings-header">
        <h1>Hesap Ayarları</h1>
        <p>Hesap ayarlarınızı buradan yönetebilirsiniz.</p>
      </div>

      <div class="settings-content">
        <!-- Hesap Ayarları -->
        <div class="settings-section">
          <h2>Hesap Ayarları</h2>
          <form [formGroup]="accountForm" (ngSubmit)="onAccountSubmit()">
            <div class="form-group">
              <label for="email">E-posta Adresi</label>
              <input type="email" id="email" formControlName="email">
              <div class="error" *ngIf="accountForm.get('email')?.touched && accountForm.get('email')?.errors?.['required']">
                E-posta adresi zorunludur
              </div>
              <div class="error" *ngIf="accountForm.get('email')?.touched && accountForm.get('email')?.errors?.['email']">
                Geçerli bir e-posta adresi giriniz
              </div>
            </div>

            <div class="form-group">
              <label for="currentPassword">Mevcut Şifre</label>
              <input type="password" id="currentPassword" formControlName="currentPassword">
            </div>

            <div class="form-group">
              <label for="newPassword">Yeni Şifre</label>
              <input type="password" id="newPassword" formControlName="newPassword">
              <div class="error" *ngIf="accountForm.get('newPassword')?.touched && accountForm.get('newPassword')?.errors?.['minlength']">
                Şifre en az 6 karakter olmalıdır
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">Yeni Şifre (Tekrar)</label>
              <input type="password" id="confirmPassword" formControlName="confirmPassword">
              <div class="error" *ngIf="accountForm.get('confirmPassword')?.touched && accountForm.get('confirmPassword')?.errors?.['passwordMismatch']">
                Şifreler eşleşmiyor
              </div>
            </div>

            <button type="submit" [disabled]="!accountForm.valid || isSubmitting">
              {{ isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
            </button>
          </form>
        </div>

        <!-- Bildirim Ayarları -->
        <div class="settings-section">
          <h2>Bildirim Ayarları</h2>
          <form [formGroup]="notificationForm" (ngSubmit)="onNotificationSubmit()">
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="emailNotifications">
                E-posta bildirimleri
              </label>
              <p class="description">Yeni mesajlar, ilan güncellemeleri ve diğer önemli bildirimler için e-posta alın.</p>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="pushNotifications">
                Push bildirimleri
              </label>
              <p class="description">Tarayıcı üzerinden anlık bildirimler alın.</p>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="marketingEmails">
                Pazarlama e-postaları
              </label>
              <p class="description">Kampanyalar, indirimler ve özel teklifler hakkında bilgi alın.</p>
            </div>

            <button type="submit" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
            </button>
          </form>
        </div>

        <!-- Gizlilik Ayarları -->
        <div class="settings-section">
          <h2>Gizlilik Ayarları</h2>
          <form [formGroup]="privacyForm" (ngSubmit)="onPrivacySubmit()">
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="showProfile">
                Profilimi herkese açık yap
              </label>
              <p class="description">Profiliniz ve ilanlarınız arama sonuçlarında görünecektir.</p>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="showPhone">
                Telefon numaramı ilanlarda göster
              </label>
              <p class="description">Telefon numaranız ilanlarınızda görünür olacaktır.</p>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="showLocation">
                Konumumu ilanlarda göster
              </label>
              <p class="description">Konumunuz ilanlarınızda görünür olacaktır.</p>
            </div>

            <button type="submit" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
            </button>
          </form>
        </div>

        <!-- Hesap Silme -->
        <div class="settings-section danger-zone">
          <h2>Tehlikeli Bölge</h2>
          <p>Hesabınızı kalıcı olarak silmek, tüm verilerinizin silinmesine neden olacaktır. Bu işlem geri alınamaz.</p>
          <button class="danger" (click)="deleteAccount()">Hesabımı Sil</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .settings-header {
      margin-bottom: 2rem;
    }

    .settings-header h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .settings-header p {
      color: #666;
      margin: 0;
    }

    .settings-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    .settings-section h2 {
      margin: 0 0 1.5rem 0;
      color: #333;
      font-size: 1.2rem;
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

    input[type="email"],
    input[type="password"] {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .checkbox-label input[type="checkbox"] {
      width: auto;
    }

    .description {
      color: #666;
      font-size: 0.875rem;
      margin: 0.25rem 0 0 1.5rem;
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    button {
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

    button:hover {
      background: #0056b3;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .danger-zone {
      border: 1px solid #dc3545;
    }

    .danger-zone h2 {
      color: #dc3545;
    }

    .danger-zone p {
      color: #666;
      margin-bottom: 1rem;
    }

    .danger {
      background: #dc3545;
    }

    .danger:hover {
      background: #c82333;
    }
  `]
})
export class SettingsComponent implements OnInit {
  accountForm: FormGroup;
  notificationForm: FormGroup;
  privacyForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    // Hesap formu
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      currentPassword: [''],
      newPassword: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validator: this.passwordMatchValidator });

    // Bildirim formu
    this.notificationForm = this.fb.group({
      emailNotifications: [true],
      pushNotifications: [true],
      marketingEmails: [false]
    });

    // Gizlilik formu
    this.privacyForm = this.fb.group({
      showProfile: [true],
      showPhone: [true],
      showLocation: [true]
    });
  }

  ngOnInit() {
    // Form verilerini doldur
    this.loadSettings();
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
  }

  loadSettings() {
    // TODO: API'den ayarları yükle
    const settings = {
      email: 'user@example.com',
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      showProfile: true,
      showPhone: true,
      showLocation: true
    };

    this.accountForm.patchValue({ email: settings.email });
    this.notificationForm.patchValue({
      emailNotifications: settings.emailNotifications,
      pushNotifications: settings.pushNotifications,
      marketingEmails: settings.marketingEmails
    });
    this.privacyForm.patchValue({
      showProfile: settings.showProfile,
      showPhone: settings.showPhone,
      showLocation: settings.showLocation
    });
  }

  onAccountSubmit() {
    if (this.accountForm.valid) {
      this.isSubmitting = true;
      // TODO: Implement API call to update account settings
      console.log(this.accountForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        // TODO: Show success message
      }, 2000);
    }
  }

  onNotificationSubmit() {
    this.isSubmitting = true;
    // TODO: Implement API call to update notification settings
    console.log(this.notificationForm.value);
    setTimeout(() => {
      this.isSubmitting = false;
      // TODO: Show success message
    }, 2000);
  }

  onPrivacySubmit() {
    this.isSubmitting = true;
    // TODO: Implement API call to update privacy settings
    console.log(this.privacyForm.value);
    setTimeout(() => {
      this.isSubmitting = false;
      // TODO: Show success message
    }, 2000);
  }

  deleteAccount() {
    if (confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      // TODO: Implement API call to delete account
      console.log('Account deletion requested');
    }
  }
}
