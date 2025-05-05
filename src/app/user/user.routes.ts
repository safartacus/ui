import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ListingsComponent } from './listings/listings.component';
import { MessagesComponent } from './messages/messages.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const USER_ROUTES: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listings',
    component: ListingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard]
  }
];
