import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="featured-container">
      <h1>Öne Çıkan İlanlar</h1>

      <div class="filters">
        <select [(ngModel)]="selectedCategory" (change)="filterProducts()">
          <option value="">Tüm Kategoriler</option>
          <option *ngFor="let category of categories" [value]="category">
            {{ category }}
          </option>
        </select>

        <select [(ngModel)]="selectedSort" (change)="sortProducts()">
          <option value="newest">En Yeni</option>
          <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
          <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
        </select>
      </div>

      <div class="products-grid">
        <div class="product-card" *ngFor="let product of filteredProducts">
          <div class="product-image">
            <img [src]="product.image" [alt]="product.title">
            <span class="category-tag">{{ product.category }}</span>
          </div>
          <div class="product-info">
            <h3>{{ product.title }}</h3>
            <p class="price">{{ product.price | currency:'TRY':'symbol-narrow':'1.0-0' }}</p>
            <p class="location">{{ product.location }}</p>
            <div class="product-meta">
              <span class="date">{{ product.date | date:'dd.MM.yyyy' }}</span>
              <span class="views">{{ product.views }} görüntülenme</span>
            </div>
            <button [routerLink]="['/product', product.id]">İlanı Gör</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .featured-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      margin-bottom: 2rem;
      color: #333;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-width: 200px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .product-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .product-card:hover {
      transform: translateY(-5px);
    }

    .product-image {
      position: relative;
    }

    .product-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .category-tag {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    .product-info {
      padding: 1.5rem;
    }

    .product-info h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .price {
      color: #007bff;
      font-weight: bold;
      margin: 0.5rem 0;
    }

    .location {
      color: #666;
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }

    .product-meta {
      display: flex;
      justify-content: space-between;
      color: #999;
      font-size: 0.8rem;
      margin: 0.5rem 0;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }

    button:hover {
      background: #0056b3;
    }
  `]
})
export class FeaturedComponent {
  categories = ['Elektronik', 'Moda', 'Ev Eşyaları', 'Spor', 'Otomobil', 'Mobilya'];
  selectedCategory = '';
  selectedSort = 'newest';

  products = [
    {
      id: 1,
      title: 'iPhone 13 Pro 256GB',
      price: 25000,
      location: 'İstanbul',
      category: 'Elektronik',
      image: 'assets/images/products/iphone.jpg',
      date: new Date('2024-03-15'),
      views: 1250
    },
    {
      id: 2,
      title: 'Samsung 4K Smart TV 55"',
      price: 15000,
      location: 'Ankara',
      category: 'Elektronik',
      image: 'assets/images/products/tv.jpg',
      date: new Date('2024-03-14'),
      views: 980
    },
    {
      id: 3,
      title: 'Nike Air Max 2024',
      price: 2000,
      location: 'İzmir',
      category: 'Spor',
      image: 'assets/images/products/shoes.jpg',
      date: new Date('2024-03-13'),
      views: 750
    },
    {
      id: 4,
      title: 'MacBook Pro M2',
      price: 35000,
      location: 'İstanbul',
      category: 'Elektronik',
      image: 'assets/images/products/macbook.jpg',
      date: new Date('2024-03-12'),
      views: 1500
    }
  ];

  filteredProducts = [...this.products];

  filterProducts() {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    } else {
      this.filteredProducts = [...this.products];
    }
    this.sortProducts();
  }

  sortProducts() {
    switch (this.selectedSort) {
      case 'price-asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
    }
  }
}
