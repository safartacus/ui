import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="product-list-container">
      <div class="filters-sidebar">
        <h3>Filtreler</h3>

        <!-- Fiyat Aralığı -->
        <div class="filter-group">
          <h4>Fiyat Aralığı</h4>
          <div class="price-inputs">
            <input type="number" [(ngModel)]="minPrice" placeholder="Min">
            <span>-</span>
            <input type="number" [(ngModel)]="maxPrice" placeholder="Max">
          </div>
        </div>

        <!-- Konum -->
        <div class="filter-group">
          <h4>Konum</h4>
          <select [(ngModel)]="selectedLocation">
            <option value="">Tüm Konumlar</option>
            <option *ngFor="let location of locations" [value]="location">
              {{ location }}
            </option>
          </select>
        </div>

        <!-- Sıralama -->
        <div class="filter-group">
          <h4>Sıralama</h4>
          <select [(ngModel)]="selectedSort" (change)="sortProducts()">
            <option value="newest">En Yeni</option>
            <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
            <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
            <option value="popular">En Popüler</option>
          </select>
        </div>

        <button class="apply-filters" (click)="applyFilters()">Filtreleri Uygula</button>
      </div>

      <div class="products-section">
        <div class="category-header">
          <h1>{{ categoryName }}</h1>
          <p>{{ filteredProducts.length }} ilan bulundu</p>
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
    </div>
  `,
  styles: [`
    .product-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 2rem;
    }

    .filters-sidebar {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .filter-group {
      margin-bottom: 1.5rem;
    }

    h3, h4 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .price-inputs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .apply-filters {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .category-header {
      margin-bottom: 2rem;
    }

    .category-header h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .category-header p {
      color: #666;
      margin: 0;
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
export class ProductListComponent implements OnInit {
  categoryName = '';
  minPrice = 0;
  maxPrice = 0;
  selectedLocation = '';
  selectedSort = 'newest';
  locations = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'];

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const category = params['category'];
      this.categoryName = this.getCategoryName(category);
      this.filterProducts();
    });
  }

  getCategoryName(slug: string): string {
    const categories: { [key: string]: string } = {
      'elektronik': 'Elektronik',
      'moda': 'Moda',
      'ev-esyalari': 'Ev Eşyaları',
      'spor': 'Spor',
      'otomobil': 'Otomobil',
      'mobilya': 'Mobilya'
    };
    return categories[slug] || slug;
  }

  applyFilters() {
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = !this.categoryName || product.category === this.categoryName;
      const matchesPrice = (!this.minPrice || product.price >= this.minPrice) &&
                          (!this.maxPrice || product.price <= this.maxPrice);
      const matchesLocation = !this.selectedLocation || product.location === this.selectedLocation;

      return matchesCategory && matchesPrice && matchesLocation;
    });

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
      case 'popular':
        this.filteredProducts.sort((a, b) => b.views - a.views);
        break;
    }
  }
}
