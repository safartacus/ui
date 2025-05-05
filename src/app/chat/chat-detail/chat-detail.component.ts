import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="chat-detail-container">
      <!-- Sohbet Başlığı -->
      <div class="chat-header">
        <div class="user-info">
          <img [src]="chat?.avatar" [alt]="chat?.name">
          <div>
            <h2>{{ chat?.name }}</h2>
            <span class="status" [class.online]="chat?.isOnline">
              {{ chat?.isOnline ? 'Çevrimiçi' : 'Çevrimdışı' }}
            </span>
          </div>
        </div>
        <div class="actions">
          <button class="action-btn" (click)="toggleFavorite()">
            <i class="fas" [class.fa-star]="isFavorite" [class.fa-star-o]="!isFavorite"></i>
          </button>
          <button class="action-btn" (click)="showOptions()">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      <!-- Mesaj Listesi -->
      <div class="messages-container" #messagesContainer>
        <div class="date-separator" *ngIf="chat?.messages?.length">
          <span>{{ chat?.messages[0].time | date:'d MMMM y' }}</span>
        </div>

        <div class="message"
             *ngFor="let message of chat?.messages"
             [class.sent]="message.isSent">
          <div class="message-content">
            <p>{{ message.text }}</p>
            <span class="time">{{ message.time | date:'HH:mm' }}</span>
          </div>
        </div>

        <!-- Yazıyor... -->
        <div class="typing-indicator" *ngIf="isTyping">
          <div class="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>{{ chat?.name }} yazıyor...</p>
        </div>
      </div>

      <!-- Mesaj Gönderme -->
      <div class="message-input">
        <button class="attach-btn" (click)="attachFile()">
          <i class="fas fa-paperclip"></i>
        </button>
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
  `,
  styles: [`
    .chat-detail-container {
      height: calc(100vh - 64px);
      display: flex;
      flex-direction: column;
      background: white;
    }

    .chat-header {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .status {
      font-size: 0.875rem;
      color: #666;
    }

    .status.online {
      color: #28a745;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      color: #666;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .action-btn:hover {
      background: #f8f9fa;
    }

    .messages-container {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .date-separator {
      text-align: center;
      margin: 1rem 0;
    }

    .date-separator span {
      background: #f8f9fa;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      color: #666;
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

    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #f8f9fa;
      border-radius: 1rem;
      align-self: flex-start;
    }

    .typing-indicator p {
      margin: 0;
      font-size: 0.875rem;
      color: #666;
    }

    .dots {
      display: flex;
      gap: 0.25rem;
    }

    .dots span {
      width: 8px;
      height: 8px;
      background: #666;
      border-radius: 50%;
      animation: typing 1s infinite;
    }

    .dots span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dots span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-4px);
      }
    }

    .message-input {
      padding: 1rem;
      border-top: 1px solid #eee;
      display: flex;
      gap: 1rem;
      align-items: flex-end;
    }

    .attach-btn {
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      color: #666;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .attach-btn:hover {
      background: #f8f9fa;
    }

    textarea {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
      height: 40px;
      font-family: inherit;
      font-size: 1rem;
    }

    .send-btn {
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

    .send-btn:hover {
      background: #0056b3;
    }

    .send-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class ChatDetailComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  chat: any = null;
  newMessage = '';
  isTyping = false;
  isFavorite = false;
  typingTimeout: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // TODO: API'den sohbet detaylarını yükle
    this.chat = {
      id: '1',
      name: 'Ahmet Yılmaz',
      avatar: 'assets/images/avatars/user1.jpg',
      isOnline: true,
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
    };
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.newMessage.trim()) {
        // TODO: Implement message sending logic
        console.log('Sending message:', this.newMessage);
        this.newMessage = '';
      }
    }
  }

  sendMessageFromButton() {
    if (this.newMessage.trim()) {
      // TODO: Implement message sending logic
      console.log('Sending message:', this.newMessage);
      this.newMessage = '';
    }
  }

  onTyping() {
    if (!this.isTyping) {
      this.isTyping = true;
      // TODO: API'ye yazıyor durumunu bildir
    }

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
      // TODO: API'ye yazma durumunu sonlandır
    }, 2000);
  }

  attachFile() {
    // TODO: Dosya ekleme işlevini implement et
    console.log('File attachment requested');
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // TODO: API'ye favori durumunu güncelle
  }

  showOptions() {
    // TODO: Sohbet seçenekleri menüsünü göster
    console.log('Show chat options');
  }
}
