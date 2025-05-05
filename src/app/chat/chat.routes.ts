import { Routes } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    component: ChatListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ChatDetailComponent,
    canActivate: [AuthGuard]
  }
];
