import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="favorites-container">
      <div class="favorites-header">
        <h1>Favorilerim</h1>
      </div>

      <!-- Filtreler -->
      <div class="filters">
        <div class="filter-group">
          <label for="sort">Sıralama</label>
          <select id="sort" [(ngModel)]="selectedSort" (change)="sortFavorites()">
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="price-asc">Fiyat (Artan)</option>
            <option value="price-desc">Fiyat (Azalan)</option>
          </select>
        </div>
      </div>

      <!-- Favori Listesi -->
      <div class="favorites-grid">
        <div class="favorite-card" *ngFor="let favorite of sortedFavorites">
          <div class="favorite-image">
            <img [src]="favorite.images[0]" [alt]="favorite.title">
            <button class="remove-favorite" (click)="removeFavorite(favorite.id)">
              <i class="fas fa-heart"></i>
            </button>
          </div>

          <div class="favorite-content">
            <h3>{{ favorite.title }}</h3>
            <p class="price">{{ favorite.price | currency:'TRY':'symbol-narrow':'1.0-0' }}</p>

            <div class="favorite-meta">
              <span class="location">{{ favorite.location }}</span>
              <span class="date">{{ favorite.date | date:'dd.MM.yyyy' }}</span>
            </div>

            <div class="favorite-actions">
              <button class="view" [routerLink]="['/product', favorite.id]">
                <i class="fas fa-eye"></i> İlana Git
              </button>
              <button class="contact" (click)="contactSeller(favorite.id)">
                <i class="fas fa-comment"></i> Satıcıyla İletişime Geç
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Boş Durum -->
      <div class="empty-state" *ngIf="favorites.length === 0">
        <i class="fas fa-heart"></i>
        <h2>Henüz favori ilanınız bulunmuyor</h2>
        <p>Beğendiğiniz ilanları favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.</p>
        <button routerLink="/">İlanlara Göz At</button>
      </div>
    </div>
  `,
  styles: [`
    .favorites-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .favorites-header {
      margin-bottom: 2rem;
    }

    .favorites-header h1 {
      margin: 0;
      color: #333;
    }

    .filters {
      margin-bottom: 2rem;
    }

    .filter-group {
      max-width: 300px;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .favorites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .favorite-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .favorite-card:hover {
      transform: translateY(-4px);
    }

    .favorite-image {
      position: relative;
      aspect-ratio: 16/9;
    }

    .favorite-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .remove-favorite {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: #dc3545;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: all 0.2s;
    }

    .remove-favorite:hover {
      background: #dc3545;
      color: white;
    }

    .favorite-content {
      padding: 1.5rem;
    }

    .favorite-content h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 1.1rem;
    }

    .price {
      color: #007bff;
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 0 1rem 0;
    }

    .favorite-meta {
      display: flex;
      justify-content: space-between;
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .favorite-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .favorite-actions button {
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: background 0.2s;
    }

    .view {
      background: #f8f9fa;
      color: #333;
    }

    .view:hover {
      background: #e9ecef;
    }

    .contact {
      background: #007bff;
      color: white;
    }

    .contact:hover {
      background: #0056b3;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .empty-state i {
      font-size: 4rem;
      color: #dc3545;
      margin-bottom: 1rem;
    }

    .empty-state h2 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .empty-state p {
      color: #666;
      margin: 0 0 1.5rem 0;
    }

    .empty-state button {
      padding: 0.75rem 1.5rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .empty-state button:hover {
      background: #0056b3;
    }
  `]
})
export class FavoritesComponent implements OnInit {
  selectedSort = 'newest';
  favorites: any[] = [];
  sortedFavorites: any[] = [];

  constructor() {
    // Örnek veri
    this.favorites = [
      {
        id: 1,
        title: 'iPhone 13 Pro 256GB',
        price: 25000,
        location: 'İstanbul',
        date: new Date('2024-03-15'),
        images: ['assets/images/products/iphone-1.jpg']
      },
      {
        id: 2,
        title: 'MacBook Pro M1 16GB',
        price: 35000,
        location: 'Ankara',
        date: new Date('2024-03-14'),
        images: ['assets/images/products/macbook-1.jpg']
      },
      {
        id: 3,
        title: 'Samsung Galaxy S21',
        price: 15000,
        location: 'İzmir',
        date: new Date('2024-03-10'),
        images: ['assets/images/products/samsung-1.jpg']
      }
    ];
    this.sortedFavorites = [...this.favorites];
  }

  ngOnInit() {
    this.sortFavorites();
  }

  sortFavorites() {
    this.sortedFavorites.sort((a, b) => {
      switch (this.selectedSort) {
        case 'newest':
          return b.date.getTime() - a.date.getTime();
        case 'oldest':
          return a.date.getTime() - b.date.getTime();
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  removeFavorite(id: number) {
    if (confirm('Bu ilanı favorilerden çıkarmak istediğinizden emin misiniz?')) {
      // TODO: Implement API call to remove from favorites
      this.favorites = this.favorites.filter(favorite => favorite.id !== id);
      this.sortFavorites();
    }
  }

  contactSeller(id: number) {
    // TODO: Implement contact seller functionality
    console.log('Contact seller for product:', id);
  }
}
