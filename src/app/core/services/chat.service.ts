import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Message {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  createdAt: Date;
  isRead: boolean;
}

export interface Conversation {
  id: number;
  participants: {
    id: number;
    name: string;
    avatar?: string;
  }[];
  lastMessage: Message;
  unreadCount: number;
  product?: {
    id: number;
    title: string;
    image: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.apiUrl}/chat/conversations`);
  }

  getMessages(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${environment.apiUrl}/chat/conversations/${conversationId}/messages`);
  }

  sendMessage(conversationId: number, text: string): Observable<Message> {
    return this.http.post<Message>(`${environment.apiUrl}/chat/conversations/${conversationId}/messages`, { text });
  }

  markAsRead(conversationId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/chat/conversations/${conversationId}/read`, {});
  }

  startConversation(productId: number, message: string): Observable<Conversation> {
    return this.http.post<Conversation>(`${environment.apiUrl}/chat/conversations`, {
      productId,
      message
    });
  }

  deleteConversation(conversationId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/chat/conversations/${conversationId}`);
  }
}
