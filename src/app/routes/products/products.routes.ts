import { Routes } from '@angular/router';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';

export const productsRoutes: Routes = [
  {
    path: 'products/:productId', // :productId => Route params
    // localhost:4200/products/5 // localhost:4200/products/1
    component: ProductDetailPageComponent,
  },
];
