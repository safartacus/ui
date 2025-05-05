import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>Profil Bilgileri</h1>
        <p>Hesap bilgilerinizi buradan güncelleyebilirsiniz.</p>
      </div>

      <div class="profile-content">
        <!-- Profil Fotoğrafı -->
        <div class="profile-photo">
          <div class="photo-container">
            <img [src]="profilePhoto" [alt]="userProfile.name">
            <div class="photo-overlay" (click)="onPhotoClick()">
              <i class="fas fa-camera"></i>
              <span>Fotoğraf Değiştir</span>
            </div>
          </div>
          <input type="file" #photoInput (change)="onPhotoChange($event)" accept="image/*" style="display: none">
        </div>

        <!-- Profil Formu -->
        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
          <!-- Kişisel Bilgiler -->
          <div class="form-section">
            <h2>Kişisel Bilgiler</h2>

            <div class="form-group">
              <label for="name">Ad Soyad</label>
              <input type="text" id="name" formControlName="name">
              <div class="error" *ngIf="profileForm.get('name')?.touched && profileForm.get('name')?.errors?.['required']">
                Ad soyad zorunludur
              </div>
            </div>

            <div class="form-group">
              <label for="email">E-posta</label>
              <input type="email" id="email" formControlName="email">
              <div class="error" *ngIf="profileForm.get('email')?.touched && profileForm.get('email')?.errors?.['required']">
                E-posta zorunludur
              </div>
              <div class="error" *ngIf="profileForm.get('email')?.touched && profileForm.get('email')?.errors?.['email']">
                Geçerli bir e-posta adresi giriniz
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Telefon</label>
              <input type="tel" id="phone" formControlName="phone">
              <div class="error" *ngIf="profileForm.get('phone')?.touched && profileForm.get('phone')?.errors?.['required']">
                Telefon numarası zorunludur
              </div>
            </div>
          </div>

          <!-- Konum Bilgileri -->
          <div class="form-section">
            <h2>Konum Bilgileri</h2>

            <div class="form-group">
              <label for="city">Şehir</label>
              <select id="city" formControlName="city">
                <option value="">Şehir Seçin</option>
                <option *ngFor="let city of cities" [value]="city">{{ city }}</option>
              </select>
              <div class="error" *ngIf="profileForm.get('city')?.touched && profileForm.get('city')?.errors?.['required']">
                Şehir seçimi zorunludur
              </div>
            </div>

            <div class="form-group">
              <label for="district">İlçe</label>
              <select id="district" formControlName="district">
                <option value="">İlçe Seçin</option>
                <option *ngFor="let district of districts" [value]="district">{{ district }}</option>
              </select>
            </div>
          </div>

          <!-- İletişim Tercihleri -->
          <div class="form-section">
            <h2>İletişim Tercihleri</h2>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="showPhone">
                Telefon numaramı ilanlarda göster
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="showEmail">
                E-posta adresimi ilanlarda göster
              </label>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="submit" [disabled]="!profileForm.valid || isSubmitting">
              {{ isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .profile-header {
      margin-bottom: 2rem;
    }

    .profile-header h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .profile-header p {
      color: #666;
      margin: 0;
    }

    .profile-content {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 2rem;
    }

    .profile-photo {
      position: relative;
    }

    .photo-container {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
    }

    .photo-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .photo-container:hover .photo-overlay {
      opacity: 1;
    }

    .photo-overlay i {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .profile-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section h2 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.2rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    input, select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
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

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      margin-top: 2rem;
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
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitting = false;
  profilePhoto = 'assets/images/avatars/default.jpg';

  cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'];
  districts: string[] = [];

  userProfile = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '0555 123 4567',
    city: 'İstanbul',
    district: 'Kadıköy',
    showPhone: true,
    showEmail: false
  };

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      district: [''],
      showPhone: [true],
      showEmail: [false]
    });
  }

  ngOnInit() {
    // Form verilerini doldur
    this.profileForm.patchValue(this.userProfile);

    // Şehir değişikliğini dinle
    this.profileForm.get('city')?.valueChanges.subscribe(city => {
      this.onCityChange(city);
    });
  }

  onCityChange(city: string) {
    // TODO: API'den ilçeleri getir
    if (city === 'İstanbul') {
      this.districts = ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli'];
    } else {
      this.districts = [];
    }
  }

  onPhotoClick() {
    const photoInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    photoInput?.click();
  }

  onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.profilePhoto = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isSubmitting = true;
      // TODO: Implement API call to update profile
      console.log(this.profileForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        // TODO: Show success message
      }, 2000);
    }
  }
}
