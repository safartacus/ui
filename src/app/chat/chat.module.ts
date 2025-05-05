import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CHAT_ROUTES } from './chat.routes';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CHAT_ROUTES),
    FormsModule,
    ChatListComponent,
    ChatDetailComponent
  ]
})
export class ChatModule { }
