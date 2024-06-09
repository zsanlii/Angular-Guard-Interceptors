import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { productsRoutes } from './products/products.routes';
import { categoriesRoutes } from './categories/categories.routes';
import { BasicLayoutComponent } from '../shared/components/basic-layout/basic-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { guardForm } from '../features/guard-form/guard-form.routes';

export const routes: Routes = [
  {
    path: '', // Mevcut route, belirtilen path ile eşleştiğinde
    component: BasicLayoutComponent, // İlgili component'i, AppComponent'den başlayarak ilk karşılaştığı router-outlet'e yerleştirir.
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      ...authRoutes, // ... spread operatörü ile authRoutes array'ini routes array'ine ekliyoruz.
      ...productsRoutes,
      ...categoriesRoutes,
      ...guardForm
    ], // Bu route'un altında başka route'lar olabilir. Bu route'un altındaki route'lar, bu route'un component'i içerisindeki -BasicLayoutComponent- ilk karşılaştığı router-outlet'e yerleştirilir.
  },
];
