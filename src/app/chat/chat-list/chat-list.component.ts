import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="chat-list-container">
      <div class="chat-list-header">
        <h1>Mesajlarım</h1>
        <button class="new-chat-btn" (click)="startNewChat()">
          <i class="fas fa-plus"></i>
          Yeni Sohbet
        </button>
      </div>

      <div class="search-box">
        <input
          type="text"
          placeholder="Sohbetlerde ara..."
          [(ngModel)]="searchQuery"
          (input)="filterChats()">
      </div>

      <div class="chat-list">
        <div class="chat-item"
             *ngFor="let chat of filteredChats"
             [routerLink]="['/chat', chat.id]"
             [class.active]="selectedChatId === chat.id">
          <div class="chat-avatar">
            <img [src]="chat.avatar" [alt]="chat.name">
            <span class="status" [class.online]="chat.isOnline"></span>
          </div>

          <div class="chat-info">
            <div class="chat-header">
              <h3>{{ chat.name }}</h3>
              <span class="time">{{ chat.lastMessage.time | date:'HH:mm' }}</span>
            </div>

            <div class="chat-preview">
              <p>{{ chat.lastMessage.text }}</p>
              <span class="unread" *ngIf="chat.unreadCount">{{ chat.unreadCount }}</span>
            </div>
          </div>
        </div>

        <!-- Boş Durum -->
        <div class="empty-state" *ngIf="filteredChats.length === 0">
          <i class="fas fa-comments"></i>
          <h2>Henüz mesajınız bulunmuyor</h2>
          <p>Yeni bir sohbet başlatmak için "Yeni Sohbet" butonuna tıklayın.</p>
          <button (click)="startNewChat()">Yeni Sohbet Başlat</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-list-container {
      height: calc(100vh - 64px);
      display: flex;
      flex-direction: column;
      background: white;
    }

    .chat-list-header {
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-list-header h1 {
      margin: 0;
      color: #333;
    }

    .new-chat-btn {
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

    .new-chat-btn:hover {
      background: #0056b3;
    }

    .search-box {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    .search-box input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .chat-list {
      flex: 1;
      overflow-y: auto;
    }

    .chat-item {
      display: flex;
      padding: 1rem;
      gap: 1rem;
      cursor: pointer;
      transition: background 0.2s;
      border-bottom: 1px solid #eee;
    }

    .chat-item:hover {
      background: #f8f9fa;
    }

    .chat-item.active {
      background: #e9ecef;
    }

    .chat-avatar {
      position: relative;
      width: 48px;
      height: 48px;
    }

    .chat-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #dc3545;
      border: 2px solid white;
    }

    .status.online {
      background: #28a745;
    }

    .chat-info {
      flex: 1;
      min-width: 0;
    }

    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.25rem;
    }

    .chat-header h3 {
      margin: 0;
      font-size: 1rem;
      color: #333;
    }

    .time {
      font-size: 0.875rem;
      color: #666;
    }

    .chat-preview {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chat-preview p {
      margin: 0;
      font-size: 0.875rem;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .unread {
      background: #007bff;
      color: white;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      min-width: 1.5rem;
      text-align: center;
    }

    .empty-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
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
export class ChatListComponent implements OnInit {
  searchQuery = '';
  selectedChatId: string | null = null;
  chats: any[] = [];
  filteredChats: any[] = [];

  constructor() {
    // Örnek veri
    this.chats = [
      {
        id: '1',
        name: 'Ahmet Yılmaz',
        avatar: 'assets/images/avatars/user1.jpg',
        isOnline: true,
        unreadCount: 2,
        lastMessage: {
          text: 'Merhaba, ilan hala satılık mı?',
          time: new Date('2024-03-15T14:30:00')
        }
      },
      {
        id: '2',
        name: 'Ayşe Demir',
        avatar: 'assets/images/avatars/user2.jpg',
        isOnline: false,
        unreadCount: 0,
        lastMessage: {
          text: 'Teşekkürler, görüşmek üzere.',
          time: new Date('2024-03-15T13:15:00')
        }
      }
    ];
    this.filteredChats = [...this.chats];
  }

  ngOnInit() {
    // TODO: API'den sohbetleri yükle
  }

  filterChats() {
    if (!this.searchQuery) {
      this.filteredChats = [...this.chats];
    } else {
      this.filteredChats = this.chats.filter(chat =>
        chat.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        chat.lastMessage.text.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  startNewChat() {
    // TODO: Yeni sohbet başlatma modalını aç
    console.log('New chat started');
  }
}
