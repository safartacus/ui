import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <a routerLink="/">Harmanagel</a>
        </div>
        <div class="search-city">
          <input
            type="text"
            placeholder="Araba, telefon, bisiklet ve daha fazlası..."
            [(ngModel)]="searchQuery"
            (keyup.enter)="onSearch()" />
          <select [(ngModel)]="selectedCity" (change)="onCityChange()">
            <option *ngFor="let city of cities" [value]="city">{{ city }}</option>
          </select>
        </div>
        <nav class="nav-menu">
          <a routerLink="/products" routerLinkActive="active">İlanlar</a>
          <a routerLink="/chat" routerLinkActive="active">Mesajlar</a>
          <a routerLink="/user/profile" routerLinkActive="active">Profilim</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      width: 100%;
      background: #fff;
      border-bottom: 1px solid #eee;
      padding: 0;
    }
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .logo a {
      font-family: 'Pacifico', cursive;
      color: #ff3b30;
      font-size: 2.2rem;
      text-decoration: none;
      user-select: none;
      white-space: nowrap;
    }
    .search-city {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1 1 350px;
      min-width: 220px;
    }
    .search-city input {
      flex: 1 1 200px;
      padding: 12px 16px;
      border: none;
      background: #fafafa;
      border-radius: 10px;
      font-size: 1rem;
      outline: none;
      box-shadow: 0 1px 4px rgba(0,0,0,0.03);
      min-width: 120px;
    }
    .search-city select {
      padding: 10px 16px;
      border-radius: 20px;
      border: 1px solid #eee;
      background: #fff;
      font-size: 1rem;
      outline: none;
      cursor: pointer;
      min-width: 150px;
    }
    .nav-menu {
      display: flex;
      gap: 1.5rem;
      flex-shrink: 0;
    }
    .nav-menu a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .nav-menu a:hover {
      background: #f8f9fa;
    }
    .nav-menu a.active {
      color: #007bff;
    }
    @media (max-width: 900px) {
      .header-content {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 12px 8px;
      }
      .search-city {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
      }
      .nav-menu {
        justify-content: center;
        gap: 1rem;
      }
      .logo {
        text-align: center;
        margin-bottom: 4px;
      }
    }
  `]
})
export class HeaderComponent {
  searchQuery = '';
  selectedCity = 'İstanbul, Türkiye';
  cities = [
    'İstanbul, Türkiye',
    'Ankara, Türkiye',
    'İzmir, Türkiye',
    'Bursa, Türkiye',
    'Antalya, Türkiye'
    // ... diğer şehirler
  ];

  onSearch() {
    if (this.searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }
  onCityChange() {
    // Şehir değiştiğinde yapılacak işlemler
  }
}
