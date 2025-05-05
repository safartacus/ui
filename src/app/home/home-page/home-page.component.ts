import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <h1>İkinci El Alışverişin En Güvenli Adresi</h1>
        <p>Binlerce ilan arasından size en uygun olanı bulun</p>
        <div class="search-container">
          <input type="text" placeholder="Ne aramıştınız?">
          <button>ARA</button>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories">
        <h2>Popüler Kategoriler</h2>
        <div class="category-grid">
          <div class="category-card" *ngFor="let category of categories">
            <img [src]="category.image" [alt]="category.name">
            <h3>{{ category.name }}</h3>
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="featured">
        <h2>Öne Çıkan İlanlar</h2>
        <div class="product-grid">
          <div class="product-card" *ngFor="let product of featuredProducts">
            <img [src]="product.image" [alt]="product.title">
            <div class="product-info">
              <h3>{{ product.title }}</h3>
              <p class="price">{{ product.price }} TL</p>
              <p class="location">{{ product.location }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero {
      text-align: center;
      padding: 4rem 0;
      background: linear-gradient(to right, #007bff, #00bcd4);
      color: white;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .search-container {
      max-width: 600px;
      margin: 2rem auto;
      display: flex;
      gap: 1rem;
    }

    .search-container input {
      flex: 1;
      padding: 1rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
    }

    .search-container button {
      padding: 1rem 2rem;
      background: #ff6b6b;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .categories, .featured {
      margin-bottom: 3rem;
    }

    h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
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
      height: 150px;
      object-fit: cover;
    }

    .category-card h3 {
      padding: 1rem;
      margin: 0;
      text-align: center;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .product-info {
      padding: 1rem;
    }

    .product-info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }

    .price {
      color: #007bff;
      font-weight: bold;
      margin: 0.5rem 0;
    }

    .location {
      color: #666;
      font-size: 0.9rem;
      margin: 0;
    }
  `]
})
export class HomePageComponent {
  categories = [
    { name: 'Elektronik', image: 'assets/images/categories/electronics.jpg' },
    { name: 'Moda', image: 'assets/images/categories/fashion.jpg' },
    { name: 'Ev Eşyaları', image: 'assets/images/categories/home.jpg' },
    { name: 'Spor', image: 'assets/images/categories/sports.jpg' },
    { name: 'Otomobil', image: 'assets/images/categories/auto.jpg' },
    { name: 'Mobilya', image: 'assets/images/categories/furniture.jpg' }
  ];

  featuredProducts = [
    {
      title: 'iPhone 13 Pro',
      price: 25000,
      location: 'İstanbul',
      image: 'assets/images/products/iphone.jpg'
    },
    {
      title: 'Samsung 4K TV',
      price: 15000,
      location: 'Ankara',
      image: 'assets/images/products/tv.jpg'
    },
    {
      title: 'MacBook Pro',
      price: 35000,
      location: 'İzmir',
      image: 'assets/images/products/macbook.jpg'
    },
    {
      title: 'Nike Spor Ayakkabı',
      price: 2000,
      location: 'Bursa',
      image: 'assets/images/products/shoes.jpg'
    }
  ];
}
