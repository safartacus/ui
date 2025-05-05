import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="product-detail-container">
      <div class="product-gallery">
        <div class="main-image">
          <img [src]="product.images[currentImageIndex]" [alt]="product.title">
        </div>
        <div class="thumbnail-list">
          <div class="thumbnail"
               *ngFor="let image of product.images; let i = index"
               [class.active]="i === currentImageIndex"
               (click)="currentImageIndex = i">
            <img [src]="image" [alt]="product.title">
          </div>
        </div>
      </div>

      <div class="product-info">
        <div class="product-header">
          <h1>{{ product.title }}</h1>
          <p class="price">{{ product.price | currency:'TRY':'symbol-narrow':'1.0-0' }}</p>
          <div class="meta-info">
            <span class="location">{{ product.location }}</span>
            <span class="date">{{ product.date | date:'dd.MM.yyyy' }}</span>
            <span class="views">{{ product.views }} görüntülenme</span>
          </div>
        </div>

        <div class="seller-info">
          <div class="seller-profile">
            <img [src]="product.seller.avatar" [alt]="product.seller.name">
            <div class="seller-details">
              <h3>{{ product.seller.name }}</h3>
              <p>Üyelik: {{ product.seller.joinDate | date:'MM.yyyy' }}</p>
            </div>
          </div>
          <div class="seller-stats">
            <div class="stat">
              <span class="label">İlan Sayısı</span>
              <span class="value">{{ product.seller.listingsCount }}</span>
            </div>
            <div class="stat">
              <span class="label">Değerlendirme</span>
              <span class="value">{{ product.seller.rating }}/5</span>
            </div>
          </div>
        </div>

        <div class="product-description">
          <h2>İlan Açıklaması</h2>
          <p>{{ product.description }}</p>
        </div>

        <div class="product-specs">
          <h2>Ürün Özellikleri</h2>
          <div class="specs-grid">
            <div class="spec-item" *ngFor="let spec of product.specifications">
              <span class="spec-label">{{ spec.label }}</span>
              <span class="spec-value">{{ spec.value }}</span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button class="contact-seller" (click)="contactSeller()">
            <i class="fas fa-comment"></i> Satıcıyla İletişime Geç
          </button>
          <button class="favorite" [class.active]="isFavorite" (click)="toggleFavorite()">
            <i class="fas fa-heart"></i> {{ isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .product-gallery {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .main-image {
      width: 100%;
      height: 400px;
      overflow: hidden;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-list {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      overflow-x: auto;
    }

    .thumbnail {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .thumbnail.active {
      opacity: 1;
      border: 2px solid #007bff;
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .product-header h1 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .price {
      font-size: 1.5rem;
      color: #007bff;
      font-weight: bold;
      margin: 0 0 1rem 0;
    }

    .meta-info {
      display: flex;
      gap: 1rem;
      color: #666;
      font-size: 0.9rem;
    }

    .seller-info {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .seller-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .seller-profile img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }

    .seller-details h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .seller-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat .label {
      color: #666;
      font-size: 0.9rem;
    }

    .stat .value {
      color: #333;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .product-description, .product-specs {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .product-description h2, .product-specs h2 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .spec-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .spec-label {
      color: #666;
      font-size: 0.9rem;
    }

    .spec-value {
      color: #333;
      font-weight: 500;
    }

    .action-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    button {
      padding: 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
    }

    .contact-seller {
      background: #007bff;
      color: white;
    }

    .contact-seller:hover {
      background: #0056b3;
    }

    .favorite {
      background: #f8f9fa;
      color: #333;
    }

    .favorite.active {
      background: #dc3545;
      color: white;
    }

    .favorite:hover {
      background: #e9ecef;
    }

    .favorite.active:hover {
      background: #c82333;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  currentImageIndex = 0;
  isFavorite = false;

  product = {
    id: 1,
    title: 'iPhone 13 Pro 256GB',
    price: 25000,
    location: 'İstanbul',
    category: 'Elektronik',
    date: new Date('2024-03-15'),
    views: 1250,
    description: 'Sıfır, kutusunda iPhone 13 Pro 256GB. Apple Türkiye garantili, faturası mevcut. Kullanılmamış, orijinal aksesuarları ile birlikte satılıktır.',
    images: [
      'assets/images/products/iphone-1.jpg',
      'assets/images/products/iphone-2.jpg',
      'assets/images/products/iphone-3.jpg',
      'assets/images/products/iphone-4.jpg'
    ],
    seller: {
      name: 'Ahmet Yılmaz',
      avatar: 'assets/images/avatars/user1.jpg',
      joinDate: new Date('2023-01-15'),
      listingsCount: 12,
      rating: 4.8
    },
    specifications: [
      { label: 'Marka', value: 'Apple' },
      { label: 'Model', value: 'iPhone 13 Pro' },
      { label: 'Kapasite', value: '256GB' },
      { label: 'Renk', value: 'Grafit' },
      { label: 'Garanti', value: 'Apple Türkiye Garantili' },
      { label: 'Durum', value: 'Sıfır' }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // TODO: Load product data from API
    });
  }

  contactSeller() {
    // TODO: Implement contact seller functionality
    console.log('Contact seller clicked');
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // TODO: Implement favorite functionality
  }
}
