import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container" *ngIf="show">
      <div class="error-content">
        <span class="material-icons error-icon">error</span>
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <button *ngIf="retryFn" (click)="onRetry()">Tekrar Dene</button>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 4px;
      background: #fff3f3;
      border: 1px solid #ffcdd2;
    }

    .error-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .error-icon {
      color: #d32f2f;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .error-content h3 {
      color: #d32f2f;
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
    }

    .error-content p {
      color: #666;
      margin: 0 0 1rem;
    }

    .error-content button {
      padding: 0.5rem 1rem;
      background: #d32f2f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .error-content button:hover {
      background: #b71c1c;
    }
  `]
})
export class ErrorComponent {
  show = false;
  title = 'Hata';
  message = 'Bir hata oluştu.';
  retryFn: (() => void) | null = null;

  showError(title: string, message: string, retryFn?: () => void) {
    this.title = title;
    this.message = message;
    this.retryFn = retryFn || null;
    this.show = true;
  }

  hide() {
    this.show = false;
  }

  onRetry() {
    if (this.retryFn) {
      this.retryFn();
    }
  }
}
