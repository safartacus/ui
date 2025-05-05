import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" *ngIf="show" (click)="onOverlayClick($event)">
      <div class="dialog-content">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="dialog-actions">
          <button class="cancel-btn" (click)="onCancel()">{{ cancelText }}</button>
          <button class="confirm-btn" (click)="onConfirm()">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog-content {
      background: white;
      padding: 1.5rem;
      border-radius: 4px;
      min-width: 300px;
      max-width: 90%;
    }

    .dialog-content h3 {
      margin: 0 0 1rem;
      color: #333;
    }

    .dialog-content p {
      margin: 0 0 1.5rem;
      color: #666;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }

    .dialog-actions button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
    }

    .cancel-btn {
      background: #f8f9fa;
      color: #333;
    }

    .cancel-btn:hover {
      background: #e9ecef;
    }

    .confirm-btn {
      background: #dc3545;
      color: white;
    }

    .confirm-btn:hover {
      background: #c82333;
    }
  `]
})
export class ConfirmDialogComponent {
  show = false;
  title = 'Onay';
  message = 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?';
  confirmText = 'Evet';
  cancelText = 'İptal';
  onConfirmCallback: (() => void) | null = null;
  onCancelCallback: (() => void) | null = null;

  showDialog(options: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) {
    this.title = options.title || this.title;
    this.message = options.message;
    this.confirmText = options.confirmText || this.confirmText;
    this.cancelText = options.cancelText || this.cancelText;
    this.onConfirmCallback = options.onConfirm || null;
    this.onCancelCallback = options.onCancel || null;
    this.show = true;
  }

  hide() {
    this.show = false;
  }

  onConfirm() {
    if (this.onConfirmCallback) {
      this.onConfirmCallback();
    }
    this.hide();
  }

  onCancel() {
    if (this.onCancelCallback) {
      this.onCancelCallback();
    }
    this.hide();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
