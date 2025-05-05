import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="categories-container">
      <h1>Tüm Kategoriler</h1>

      <div class="categories-grid">
        <div class="category-card" *ngFor="let category of categories">
          <img [src]="category.image" [alt]="category.name">
          <div class="category-info">
            <h3>{{ category.name }}</h3>
            <p>{{ category.count }} ilan</p>
            <button [routerLink]="['/product/list', category.slug]">İlanları Gör</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .categories-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      margin-bottom: 2rem;
      color: #333;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .category-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .category-card:hover {
      transform: translateY(-5px);
    }

    .category-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .category-info {
      padding: 1.5rem;
    }

    .category-info h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .category-info p {
      color: #666;
      margin: 0 0 1rem 0;
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
export class CategoriesComponent {
  categories = [
    {
      name: 'Elektronik',
      image: 'assets/images/categories/electronics.jpg',
      count: 1250,
      slug: 'elektronik'
    },
    {
      name: 'Moda',
      image: 'assets/images/categories/fashion.jpg',
      count: 3500,
      slug: 'moda'
    },
    {
      name: 'Ev Eşyaları',
      image: 'assets/images/categories/home.jpg',
      count: 1800,
      slug: 'ev-esyalari'
    },
    {
      name: 'Spor',
      image: 'assets/images/categories/sports.jpg',
      count: 950,
      slug: 'spor'
    },
    {
      name: 'Otomobil',
      image: 'assets/images/categories/auto.jpg',
      count: 750,
      slug: 'otomobil'
    },
    {
      name: 'Mobilya',
      image: 'assets/images/categories/furniture.jpg',
      count: 1200,
      slug: 'mobilya'
    },
    {
      name: 'Kozmetik',
      image: 'assets/images/categories/cosmetics.jpg',
      count: 1500,
      slug: 'kozmetik'
    },
    {
      name: 'Kitap',
      image: 'assets/images/categories/books.jpg',
      count: 800,
      slug: 'kitap'
    }
  ];
}
