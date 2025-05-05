import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from './auth.service';
import { Product } from './product.service';

export interface UserProfile extends User {
  phone?: string;
  location?: string;
  bio?: string;
  joinedAt: Date;
  listings: Product[];
  favorites: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.apiUrl}/users/profile`);
  }

  updateProfile(profileData: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${environment.apiUrl}/users/profile`, profileData);
  }

  updateAvatar(file: File): Observable<{ avatar: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post<{ avatar: string }>(`${environment.apiUrl}/users/avatar`, formData);
  }

  getListings(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/users/listings`);
  }

  getFavorites(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/users/favorites`);
  }

  addToFavorites(productId: number): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/users/favorites/${productId}`, {});
  }

  removeFromFavorites(productId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/favorites/${productId}`);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/users/change-password`, {
      currentPassword,
      newPassword
    });
  }
}
