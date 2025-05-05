import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="messages-container">
      <div class="messages-header">
        <h1>Mesajlarım</h1>
      </div>

      <div class="messages-content">
        <!-- Sol Sidebar - Konuşma Listesi -->
        <div class="conversations-sidebar">
          <div class="search-box">
            <input type="text" placeholder="Mesajlarda ara..." [(ngModel)]="searchQuery" (input)="filterConversations()">
          </div>

          <div class="conversations-list">
            <div class="conversation-item"
                 *ngFor="let conversation of filteredConversations"
                 [class.active]="selectedConversation?.id === conversation.id"
                 (click)="selectConversation(conversation)">
              <div class="conversation-avatar">
                <img [src]="conversation.avatar" [alt]="conversation.name">
                <span class="status" [class.online]="conversation.isOnline"></span>
              </div>

              <div class="conversation-info">
                <div class="conversation-header">
                  <h3>{{ conversation.name }}</h3>
                  <span class="time">{{ conversation.lastMessage.time | date:'HH:mm' }}</span>
                </div>

                <div class="conversation-preview">
                  <p>{{ conversation.lastMessage.text }}</p>
                  <span class="unread" *ngIf="conversation.unreadCount">{{ conversation.unreadCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sağ Panel - Mesaj Detayları -->
        <div class="messages-panel" *ngIf="selectedConversation">
          <div class="messages-header">
            <div class="user-info">
              <img [src]="selectedConversation.avatar" [alt]="selectedConversation.name">
              <div>
                <h2>{{ selectedConversation.name }}</h2>
                <span class="status" [class.online]="selectedConversation.isOnline">
                  {{ selectedConversation.isOnline ? 'Çevrimiçi' : 'Çevrimdışı' }}
                </span>
              </div>
            </div>
          </div>

          <div class="messages-list" #messagesContainer>
            <div class="message"
                 *ngFor="let message of selectedConversation.messages"
                 [class.sent]="message.isSent">
              <div class="message-content">
                <p>{{ message.text }}</p>
                <span class="time">{{ message.time | date:'HH:mm' }}</span>
              </div>
            </div>
          </div>

          <div class="message-input">
            <textarea
              [(ngModel)]="newMessage"
              placeholder="Mesajınızı yazın..."
              (keydown)="sendMessage($event)"
              (input)="onTyping()"
              rows="1"
              #messageInput></textarea>
            <button class="send-btn" (click)="sendMessageFromButton()" [disabled]="!newMessage.trim()">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>

        <!-- Boş Durum -->
        <div class="empty-state" *ngIf="!selectedConversation">
          <i class="fas fa-comments"></i>
          <h2>Henüz mesajınız bulunmuyor</h2>
          <p>İlanlara göz atarak satıcılarla iletişime geçebilirsiniz.</p>
          <button routerLink="/">İlanlara Göz At</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .messages-container {
      height: calc(100vh - 64px);
      display: flex;
      flex-direction: column;
    }

    .messages-header {
      padding: 1rem 2rem;
      border-bottom: 1px solid #eee;
    }

    .messages-header h1 {
      margin: 0;
      color: #333;
    }

    .messages-content {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .conversations-sidebar {
      width: 350px;
      border-right: 1px solid #eee;
      display: flex;
      flex-direction: column;
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

    .conversations-list {
      flex: 1;
      overflow-y: auto;
    }

    .conversation-item {
      display: flex;
      padding: 1rem;
      gap: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .conversation-item:hover {
      background: #f8f9fa;
    }

    .conversation-item.active {
      background: #e9ecef;
    }

    .conversation-avatar {
      position: relative;
      width: 48px;
      height: 48px;
    }

    .conversation-avatar img {
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

    .conversation-info {
      flex: 1;
      min-width: 0;
    }

    .conversation-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.25rem;
    }

    .conversation-header h3 {
      margin: 0;
      font-size: 1rem;
      color: #333;
    }

    .time {
      font-size: 0.875rem;
      color: #666;
    }

    .conversation-preview {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .conversation-preview p {
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

    .messages-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .messages-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-info h2 {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .messages-list {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      display: flex;
      flex-direction: column;
      max-width: 70%;
    }

    .message.sent {
      align-self: flex-end;
    }

    .message-content {
      background: #f8f9fa;
      padding: 0.75rem 1rem;
      border-radius: 1rem;
      position: relative;
    }

    .message.sent .message-content {
      background: #007bff;
      color: white;
    }

    .message-content p {
      margin: 0 0 0.5rem 0;
    }

    .message-content .time {
      font-size: 0.75rem;
      color: #666;
    }

    .message.sent .message-content .time {
      color: rgba(255,255,255,0.8);
    }

    .message-input {
      padding: 1rem;
      border-top: 1px solid #eee;
      display: flex;
      gap: 1rem;
    }

    .message-input textarea {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
      height: 40px;
      font-family: inherit;
    }

    .message-input button {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 4px;
      background: #007bff;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .message-input button:hover {
      background: #0056b3;
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
export class MessagesComponent implements OnInit {
  searchQuery = '';
  newMessage = '';
  selectedConversation: any = null;
  conversations: any[] = [];
  filteredConversations: any[] = [];

  constructor() {
    // Örnek veri
    this.conversations = [
      {
        id: 1,
        name: 'Ahmet Yılmaz',
        avatar: 'assets/images/avatars/user1.jpg',
        isOnline: true,
        unreadCount: 2,
        lastMessage: {
          text: 'Merhaba, ilan hala satılık mı?',
          time: new Date('2024-03-15T14:30:00')
        },
        messages: [
          {
            text: 'Merhaba, ilan hala satılık mı?',
            time: new Date('2024-03-15T14:30:00'),
            isSent: false
          },
          {
            text: 'Evet, hala satılık. Fiyatta pazarlık payı var.',
            time: new Date('2024-03-15T14:31:00'),
            isSent: true
          },
          {
            text: 'Yarın görüntüleyebilir miyim?',
            time: new Date('2024-03-15T14:32:00'),
            isSent: false
          }
        ]
      },
      {
        id: 2,
        name: 'Ayşe Demir',
        avatar: 'assets/images/avatars/user2.jpg',
        isOnline: false,
        unreadCount: 0,
        lastMessage: {
          text: 'Teşekkürler, görüşmek üzere.',
          time: new Date('2024-03-15T13:15:00')
        },
        messages: [
          {
            text: 'Ürün hakkında bilgi alabilir miyim?',
            time: new Date('2024-03-15T13:00:00'),
            isSent: false
          },
          {
            text: 'Tabii ki, hangi konuda bilgi almak istersiniz?',
            time: new Date('2024-03-15T13:05:00'),
            isSent: true
          },
          {
            text: 'Teşekkürler, görüşmek üzere.',
            time: new Date('2024-03-15T13:15:00'),
            isSent: false
          }
        ]
      }
    ];
    this.filteredConversations = [...this.conversations];
  }

  ngOnInit() {
    // İlk konuşmayı seç
    if (this.conversations.length > 0) {
      this.selectConversation(this.conversations[0]);
    }
  }

  filterConversations() {
    if (!this.searchQuery) {
      this.filteredConversations = [...this.conversations];
    } else {
      this.filteredConversations = this.conversations.filter(conversation =>
        conversation.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        conversation.lastMessage.text.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
    // Okunmamış mesajları sıfırla
    conversation.unreadCount = 0;
  }

  sendMessage(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.newMessage.trim()) {
        const message = {
          text: this.newMessage,
          time: new Date(),
          isSent: true
        };

        this.selectedConversation.messages.push(message);
        this.selectedConversation.lastMessage = message;
        this.newMessage = '';
        this.scrollToBottom();

        // TODO: API'ye mesajı gönder
        console.log('Message sent:', message);
      }
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages-list');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 0);
  }

  onTyping() {
    // This method is called when the user types in the textarea
  }

  sendMessageFromButton() {
    if (this.newMessage.trim()) {
      const message = {
        text: this.newMessage,
        time: new Date(),
        isSent: true
      };

      this.selectedConversation.messages.push(message);
      this.newMessage = '';
      this.scrollToBottom();

      // TODO: API'ye mesajı gönder
      console.log('Message sent:', message);
    }
  }
}
