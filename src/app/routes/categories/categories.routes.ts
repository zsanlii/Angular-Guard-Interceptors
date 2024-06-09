import { Routes } from '@angular/router';
import { NewCategoryPageComponent } from './management/new-category-page/new-category-page.component';

export const categoriesRoutes: Routes = [
  {
    path: 'categories/management/new',
    component: NewCategoryPageComponent,
  },
];
