import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Harmanagel</h3>
          <p>Güvenilir alışverişin adresi</p>
        </div>

        <div class="footer-section">
          <h4>Hızlı Linkler</h4>
          <a routerLink="/products">İlanlar</a>
          <a routerLink="/about">Hakkımızda</a>
          <a routerLink="/contact">İletişim</a>
        </div>

        <div class="footer-section">
          <h4>Yardım</h4>
          <a routerLink="/faq">Sıkça Sorulan Sorular</a>
          <a routerLink="/terms">Kullanım Koşulları</a>
          <a routerLink="/privacy">Gizlilik Politikası</a>
        </div>

        <div class="footer-section">
          <h4>İletişim</h4>
          <p>Email: info&#64;harmanagel.com</p>
          <p>Tel: +90 (555) 123 45 67</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Harmanagel. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #f8f9fa;
      padding: 3rem 0 1rem;
      margin-top: 3rem;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .footer-section h3 {
      color: #333;
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }

    .footer-section h4 {
      color: #333;
      margin: 0 0 1rem;
      font-size: 1.1rem;
    }

    .footer-section p {
      color: #666;
      margin: 0.5rem 0;
      line-height: 1.5;
    }

    .footer-section a {
      display: block;
      color: #666;
      text-decoration: none;
      margin: 0.5rem 0;
      transition: color 0.2s;
    }

    .footer-section a:hover {
      color: #007bff;
    }

    .footer-bottom {
      max-width: 1200px;
      margin: 2rem auto 0;
      padding: 1rem;
      text-align: center;
      border-top: 1px solid #ddd;
    }

    .footer-bottom p {
      color: #666;
      margin: 0;
    }
  `]
})
export class FooterComponent {}
