import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryListGroupComponent } from '../../features/categories/components/category-list-group/category-list-group.component';
import { ProductCardListComponent } from '../../features/products/components/product-card-list/product-card-list.component';
import { CategoryListItem } from '../../features/categories/models/category-list-item';
import { ProductListItem } from '../../features/products/models/product-list-item';
import { IfNotDirective } from '../../shared/directives/if-not.directive';
import { take } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    // CommonModule, // SharedModule içerisinde olduğu için burada tekrar eklemeye gerek yok.
    RouterModule,
    // BasicLayoutComponent,
    CategoryListGroupComponent,
    ProductCardListComponent,
    IfNotDirective,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  seletectedCategoryId: number | null = null;
  initialPageIndex: number | null = null;
  isOldUser: boolean = false;
  get now() {
    return new Date();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private change: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.categoryIdFromRoute();
    this.getProductInitialPageIndexFromRoute();
    this.detectNewUser();
  }

  getProductInitialPageIndexFromRoute() {
    this.route.queryParams.pipe(take(1)).subscribe((queryParams) => {
      const pageIndex: number | undefined = Number(queryParams['pageIndex']);
      if (pageIndex) this.initialPageIndex = pageIndex;
    });
  }

  detectNewUser() {
    let isOldUser = Boolean(
      this.document.defaultView?.localStorage?.getItem('oldUser')
    );
    if (!isOldUser) {
      this.document.defaultView?.localStorage?.setItem('oldUser', 'true');
      return;
    }
    setTimeout(() => {
      this.isOldUser = isOldUser;
      this.change.markForCheck();
    }, 5000);
  }

  categoryIdFromRoute() {
    this.route.queryParams
      .subscribe((queryParams) => {
        const categoryId: number | undefined = Number(queryParams['category']);
        if (categoryId) this.seletectedCategoryId = categoryId;
      })
      .unsubscribe();
  }

  onChangeSelectCategory(event: { selectedCategory: CategoryListItem | null }) {
    this.seletectedCategoryId = event.selectedCategory?.id || null;

    this.route.queryParams.pipe(take(1)).subscribe((queryParams) => {
      const newQueryParams = { ...queryParams };
      newQueryParams['category'] = this.seletectedCategoryId || undefined;
      newQueryParams['pageIndex'] = undefined;

      this.router.navigate([], {
        queryParams: newQueryParams,
      });
    });
  }

  onViewProduct(event: ProductListItem) {
    this.router.navigate(['products', event.id]); // localhost:4200/products/5
  }

  onProductPageChange(productPageIndex: number) {
    this.route.queryParams.pipe(take(1)).subscribe((queryParams) => {
      const newQueryParams = { ...queryParams };
      newQueryParams['pageIndex'] = productPageIndex || undefined;

      this.router.navigate([], {
        queryParams: newQueryParams,
      });
    });
  }
}
