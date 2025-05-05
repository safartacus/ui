import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { USER_ROUTES } from './user.routes';
import { ProfileComponent } from './profile/profile.component';
import { ListingsComponent } from './listings/listings.component';
import { MessagesComponent } from './messages/messages.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES),
    FormsModule,
    ReactiveFormsModule,
    ProfileComponent,
    ListingsComponent,
    MessagesComponent,
    FavoritesComponent
  ]
})
export class UserModule { }
