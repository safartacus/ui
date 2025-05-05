import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: ProductDetailComponent
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: ProductEditComponent,
    canActivate: [AuthGuard]
  }
];
