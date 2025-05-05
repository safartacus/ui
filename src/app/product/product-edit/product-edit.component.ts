import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ProductSpecifications {
  brand: string;
  model: string;
  condition: string;
  warranty: string;
  [key: string]: string; // Dinamik özellikler için index signature
}

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="edit-product-container">
      <h1>İlanı Düzenle</h1>

      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="product-form">
        <!-- Kategori Seçimi -->
        <div class="form-group">
          <label for="category">Kategori</label>
          <select id="category" formControlName="category" (change)="onCategoryChange()">
            <option value="">Kategori Seçin</option>
            <option *ngFor="let category of categories" [value]="category.value">
              {{ category.label }}
            </option>
          </select>
          <div class="error" *ngIf="productForm.get('category')?.touched && productForm.get('category')?.errors?.['required']">
            Kategori seçimi zorunludur
          </div>
        </div>

        <!-- Alt Kategori Seçimi -->
        <div class="form-group" *ngIf="subCategories.length > 0">
          <label for="subCategory">Alt Kategori</label>
          <select id="subCategory" formControlName="subCategory">
            <option value="">Alt Kategori Seçin</option>
            <option *ngFor="let subCategory of subCategories" [value]="subCategory.value">
              {{ subCategory.label }}
            </option>
          </select>
        </div>

        <!-- Başlık -->
        <div class="form-group">
          <label for="title">İlan Başlığı</label>
          <input type="text" id="title" formControlName="title" placeholder="Örn: iPhone 13 Pro 256GB">
          <div class="error" *ngIf="productForm.get('title')?.touched && productForm.get('title')?.errors?.['required']">
            Başlık zorunludur
          </div>
        </div>

        <!-- Fiyat -->
        <div class="form-group">
          <label for="price">Fiyat</label>
          <div class="price-input">
            <input type="number" id="price" formControlName="price" placeholder="0">
            <span class="currency">TL</span>
          </div>
          <div class="error" *ngIf="productForm.get('price')?.touched && productForm.get('price')?.errors?.['required']">
            Fiyat zorunludur
          </div>
        </div>

        <!-- Konum -->
        <div class="form-group">
          <label for="location">Konum</label>
          <select id="location" formControlName="location">
            <option value="">Konum Seçin</option>
            <option *ngFor="let location of locations" [value]="location">
              {{ location }}
            </option>
          </select>
          <div class="error" *ngIf="productForm.get('location')?.touched && productForm.get('location')?.errors?.['required']">
            Konum seçimi zorunludur
          </div>
        </div>

        <!-- Açıklama -->
        <div class="form-group">
          <label for="description">İlan Açıklaması</label>
          <textarea id="description" formControlName="description" rows="5"
                    placeholder="Ürününüz hakkında detaylı bilgi verin..."></textarea>
          <div class="error" *ngIf="productForm.get('description')?.touched && productForm.get('description')?.errors?.['required']">
            Açıklama zorunludur
          </div>
        </div>

        <!-- Fotoğraflar -->
        <div class="form-group">
          <label>Fotoğraflar</label>
          <div class="image-upload-container">
            <div class="image-preview" *ngFor="let image of images; let i = index">
              <img [src]="image" [alt]="'Preview ' + (i + 1)">
              <button type="button" class="remove-image" (click)="removeImage(i)">×</button>
            </div>
            <div class="upload-button" *ngIf="images.length < 5">
              <input type="file" (change)="onImageUpload($event)" accept="image/*" multiple>
              <span>Fotoğraf Ekle</span>
            </div>
          </div>
          <div class="error" *ngIf="productForm.get('images')?.touched && productForm.get('images')?.errors?.['required']">
            En az bir fotoğraf eklemelisiniz
          </div>
        </div>

        <!-- Ürün Özellikleri -->
        <div class="form-group" *ngIf="selectedCategorySpecs.length > 0">
          <label>Ürün Özellikleri</label>
          <div class="specs-container">
            <div class="spec-item" *ngFor="let spec of selectedCategorySpecs">
              <label [for]="spec.key">{{ spec.label }}</label>
              <input [type]="spec.type" [id]="spec.key" [formControlName]="spec.key" [placeholder]="spec.placeholder">
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" class="cancel" routerLink="/user/listings">İptal</button>
          <button type="submit" [disabled]="!productForm.valid || isSubmitting">
            {{ isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-product-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      margin-bottom: 2rem;
      color: #333;
    }

    .product-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

    input, select, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    textarea {
      resize: vertical;
    }

    .price-input {
      position: relative;
    }

    .currency {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .image-upload-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }

    .image-preview {
      position: relative;
      aspect-ratio: 1;
      border-radius: 4px;
      overflow: hidden;
    }

    .image-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .remove-image {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(0,0,0,0.5);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .upload-button {
      aspect-ratio: 1;
      border: 2px dashed #ddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    }

    .upload-button input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    .upload-button span {
      color: #666;
    }

    .specs-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .form-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 1rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    button[type="submit"] {
      background: #007bff;
      color: white;
    }

    button[type="submit"]:hover {
      background: #0056b3;
    }

    button[type="submit"]:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .cancel {
      background: #f8f9fa;
      color: #333;
    }

    .cancel:hover {
      background: #e9ecef;
    }
  `]
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  isSubmitting = false;
  images: string[] = [];

  categories = [
    { value: 'elektronik', label: 'Elektronik' },
    { value: 'moda', label: 'Moda' },
    { value: 'ev-esyalari', label: 'Ev Eşyaları' },
    { value: 'spor', label: 'Spor' },
    { value: 'otomobil', label: 'Otomobil' },
    { value: 'mobilya', label: 'Mobilya' }
  ];

  subCategories: { value: string; label: string }[] = [];

  locations = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'];

  selectedCategorySpecs: { key: string; label: string; type: string; placeholder: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      subCategory: [''],
      title: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
      images: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // TODO: Load product data from API
      this.loadProductData(id);
    });
  }

  loadProductData(id: string) {
    // Simüle edilmiş ürün verisi
    const mockProduct = {
      id: id,
      category: 'elektronik',
      subCategory: 'telefon',
      title: 'iPhone 13 Pro 256GB',
      price: 25000,
      location: 'İstanbul',
      description: 'Sıfır, kutusunda iPhone 13 Pro 256GB. Apple Türkiye garantili, faturası mevcut.',
      images: [
        'assets/images/products/iphone-1.jpg',
        'assets/images/products/iphone-2.jpg'
      ],
      specifications: {
        brand: 'Apple',
        model: 'iPhone 13 Pro',
        condition: 'Sıfır',
        warranty: 'Apple Türkiye Garantili'
      } as ProductSpecifications
    };

    // Form verilerini doldur
    this.productForm.patchValue({
      category: mockProduct.category,
      subCategory: mockProduct.subCategory,
      title: mockProduct.title,
      price: mockProduct.price,
      location: mockProduct.location,
      description: mockProduct.description,
      images: mockProduct.images
    });

    // Kategori değişikliğini tetikle
    this.onCategoryChange();

    // Ürün özelliklerini doldur
    if (mockProduct.specifications) {
      Object.keys(mockProduct.specifications).forEach(key => {
        this.productForm.patchValue({
          [key]: mockProduct.specifications[key]
        });
      });
    }

    // Resimleri yükle
    this.images = [...mockProduct.images];
  }

  onCategoryChange() {
    const category = this.productForm.get('category')?.value;
    this.subCategories = [];
    this.selectedCategorySpecs = [];

    if (category === 'elektronik') {
      this.subCategories = [
        { value: 'telefon', label: 'Telefon' },
        { value: 'bilgisayar', label: 'Bilgisayar' },
        { value: 'tablet', label: 'Tablet' }
      ];
      this.selectedCategorySpecs = [
        { key: 'brand', label: 'Marka', type: 'text', placeholder: 'Örn: Apple' },
        { key: 'model', label: 'Model', type: 'text', placeholder: 'Örn: iPhone 13 Pro' },
        { key: 'condition', label: 'Durum', type: 'text', placeholder: 'Örn: Sıfır' },
        { key: 'warranty', label: 'Garanti', type: 'text', placeholder: 'Örn: Apple Türkiye Garantili' }
      ];
    }
    // Diğer kategoriler için benzer şekilde alt kategoriler ve özellikler eklenebilir
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        if (this.images.length >= 5) break;

        const file = input.files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.images.push(e.target.result);
          this.productForm.patchValue({ images: this.images });
        };

        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.productForm.patchValue({ images: this.images });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      // TODO: Implement API call to update product
      console.log(this.productForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        // TODO: Navigate to product detail page after successful update
      }, 2000);
    }
  }
}
