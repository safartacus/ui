import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="listings-container">
      <div class="listings-header">
        <h1>İlanlarım</h1>
        <button class="new-listing" routerLink="/product/create">
          <i class="fas fa-plus"></i> Yeni İlan Oluştur
        </button>
      </div>

      <!-- Filtreler -->
      <div class="filters">
        <div class="filter-group">
          <label for="status">Durum</label>
          <select id="status" [(ngModel)]="selectedStatus" (change)="filterListings()">
            <option value="all">Tümü</option>
            <option value="active">Aktif</option>
            <option value="pending">Onay Bekleyen</option>
            <option value="rejected">Reddedilen</option>
            <option value="sold">Satılan</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="sort">Sıralama</label>
          <select id="sort" [(ngModel)]="selectedSort" (change)="sortListings()">
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="price-asc">Fiyat (Artan)</option>
            <option value="price-desc">Fiyat (Azalan)</option>
            <option value="views">Görüntülenme</option>
          </select>
        </div>
      </div>

      <!-- İlan Listesi -->
      <div class="listings-grid">
        <div class="listing-card" *ngFor="let listing of filteredListings">
          <div class="listing-image">
            <img [src]="listing.images[0]" [alt]="listing.title">
            <div class="listing-status" [class]="listing.status">
              {{ getStatusText(listing.status) }}
            </div>
          </div>

          <div class="listing-content">
            <h3>{{ listing.title }}</h3>
            <p class="price">{{ listing.price | currency:'TRY':'symbol-narrow':'1.0-0' }}</p>

            <div class="listing-meta">
              <span class="date">{{ listing.date | date:'dd.MM.yyyy' }}</span>
              <span class="views">{{ listing.views }} görüntülenme</span>
            </div>

            <div class="listing-actions">
              <button class="edit" [routerLink]="['/product/edit', listing.id]">
                <i class="fas fa-edit"></i> Düzenle
              </button>
              <button class="delete" (click)="deleteListing(listing.id)">
                <i class="fas fa-trash"></i> Sil
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Boş Durum -->
      <div class="empty-state" *ngIf="filteredListings.length === 0">
        <i class="fas fa-box-open"></i>
        <h2>Henüz ilanınız bulunmuyor</h2>
        <p>Yeni bir ilan oluşturarak satışa başlayabilirsiniz.</p>
        <button routerLink="/product/create">İlan Oluştur</button>
      </div>
    </div>
  `,
  styles: [`
    .listings-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .listings-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .listings-header h1 {
      margin: 0;
      color: #333;
    }

    .new-listing {
      padding: 0.75rem 1.5rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.2s;
    }

    .new-listing:hover {
      background: #0056b3;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .filter-group {
      flex: 1;
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

    .listings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .listing-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .listing-card:hover {
      transform: translateY(-4px);
    }

    .listing-image {
      position: relative;
      aspect-ratio: 16/9;
    }

    .listing-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .listing-status {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
    }

    .listing-status.active {
      background: #28a745;
    }

    .listing-status.pending {
      background: #ffc107;
    }

    .listing-status.rejected {
      background: #dc3545;
    }

    .listing-status.sold {
      background: #6c757d;
    }

    .listing-content {
      padding: 1.5rem;
    }

    .listing-content h3 {
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

    .listing-meta {
      display: flex;
      justify-content: space-between;
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .listing-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .listing-actions button {
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

    .edit {
      background: #f8f9fa;
      color: #333;
    }

    .edit:hover {
      background: #e9ecef;
    }

    .delete {
      background: #dc3545;
      color: white;
    }

    .delete:hover {
      background: #c82333;
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
      color: #ddd;
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
export class ListingsComponent implements OnInit {
  selectedStatus = 'all';
  selectedSort = 'newest';
  listings: any[] = [];
  filteredListings: any[] = [];

  constructor() {
    // Örnek veri
    this.listings = [
      {
        id: 1,
        title: 'iPhone 13 Pro 256GB',
        price: 25000,
        status: 'active',
        date: new Date('2024-03-15'),
        views: 1250,
        images: ['assets/images/products/iphone-1.jpg']
      },
      {
        id: 2,
        title: 'MacBook Pro M1 16GB',
        price: 35000,
        status: 'pending',
        date: new Date('2024-03-14'),
        views: 850,
        images: ['assets/images/products/macbook-1.jpg']
      },
      {
        id: 3,
        title: 'Samsung Galaxy S21',
        price: 15000,
        status: 'sold',
        date: new Date('2024-03-10'),
        views: 2100,
        images: ['assets/images/products/samsung-1.jpg']
      }
    ];
    this.filteredListings = [...this.listings];
  }

  ngOnInit() {
    this.filterListings();
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      active: 'Aktif',
      pending: 'Onay Bekliyor',
      rejected: 'Reddedildi',
      sold: 'Satıldı'
    };
    return statusMap[status] || status;
  }

  filterListings() {
    this.filteredListings = this.listings.filter(listing => {
      if (this.selectedStatus === 'all') return true;
      return listing.status === this.selectedStatus;
    });
    this.sortListings();
  }

  sortListings() {
    this.filteredListings.sort((a, b) => {
      switch (this.selectedSort) {
        case 'newest':
          return b.date.getTime() - a.date.getTime();
        case 'oldest':
          return a.date.getTime() - b.date.getTime();
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });
  }

  deleteListing(id: number) {
    if (confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
      // TODO: Implement API call to delete listing
      this.listings = this.listings.filter(listing => listing.id !== id);
      this.filterListings();
    }
  }
}
