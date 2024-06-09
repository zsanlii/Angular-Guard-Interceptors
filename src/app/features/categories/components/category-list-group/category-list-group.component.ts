import { CategoriesService } from './../../services/categories.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CategoryListItem } from '../../models/category-list-item';
import {
  ListGroupComponent,
  ListGroupItem,
} from '../../../../shared/components/list-group/list-group.component';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list-group',
  standalone: true,
  imports: [CommonModule, ListGroupComponent],
  templateUrl: './category-list-group.component.html',
  styleUrl: './category-list-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListGroupComponent implements OnInit {

  @Input() initialSelectedCategoryId: number | null = null;
  @Output() changeSelect = new EventEmitter<{
    selectedCategory: CategoryListItem | null;
  }>();

  categoryList!: CategoryListItem[];

  constructor(
    private categoriesService: CategoriesService,
    private change: ChangeDetectorRef,
    private router: Router, private route: ActivatedRoute) { }
   

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoriesService.getList().subscribe((categoryList) => {
      this.categoryList = categoryList;
      this.change.markForCheck();
    });
  }

  get categoryListGroupItems(): ListGroupItem[] {
    // map: array içindeki her bir elemanı dönüp yeni değerlerle, yeni bir array oluşturur.
    return this.categoryList.map((category) => {
      // ListGroupItem tipinde bir obje oluşturuldu.
      const listGroupItem: ListGroupItem = {
        id: category.id.toString(),
        label: category.name,
      };

      // Yeni bir array oluşturmak adına yeni değer geri döndürüldü.
      return listGroupItem;
    });
  }

  onChangeSelect(event: { selectedItemId: string | null }) {
    const selectedCategory: CategoryListItem | null = event.selectedItemId
      ? this.categoryList.find(
          (category) => category.id === Number.parseInt(event.selectedItemId!)
        )!
      : null;
    this.changeSelect.emit({ selectedCategory });
  }
  onButtonClick() {
    this.router.navigate(['guardForm'])
  }
}
