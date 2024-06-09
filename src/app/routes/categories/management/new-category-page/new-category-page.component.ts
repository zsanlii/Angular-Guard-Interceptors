import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddCategoryFormComponent } from '../../../../features/categories/components/add-category-form/add-category-form.component';

@Component({
  selector: 'app-new-category-page',
  standalone: true,
  imports: [
    CommonModule,
    AddCategoryFormComponent
  ],
  templateUrl: './new-category-page.component.html',
  styleUrl: './new-category-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewCategoryPageComponent { }
