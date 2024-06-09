import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductListItem } from '../../models/product-list-item';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductsService } from '../../services/products.service';
import { VatPipe } from '../../pipes/vat.pipe';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { PaginatedList } from '../../../../core/models/paginated-list';
import { OverlayComponent } from '../../../overlay/overlay.component';
import { LoadingService } from '../../../../core/auth/services/loading.service';

@Component({
  selector: 'app-product-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, VatPipe, PaginationComponent, OverlayComponent],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardListComponent implements OnInit, OnChanges {
  @Input() filterByCategoryId: number | null = null;
  @Output() viewProduct = new EventEmitter<ProductListItem>();
  @Input() initialPageIndex: number = 0;
  @Output() changePage = new EventEmitter<number>();

  productList!: PaginatedList<ProductListItem>;

  constructor(
    private productsService: ProductsService,
    private change: ChangeDetectorRef,
    private loadingService : LoadingService
  ) {}

  ngOnInit(): void {
    // ngOnInit: Angular bileşeninin yerleştiridiğinde çalışan bir yaşam döngüsü olayıdır.
    this.getProductList(this.initialPageIndex, 12);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ngOnChanges: Değişiklik algılandığında çalışan bir Angular yaşam döngüsü olayıdır.
    if (
      changes['filterByCategoryId'] &&
      changes['filterByCategoryId'].previousValue !==
        changes['filterByCategoryId'].currentValue
    )
      this.getProductList(0, 12);
  }

  getProductList(pageIndex: number, pageSize: number) {
    this.loadingService.show();
    this.productsService
      .getList(pageIndex, pageSize, this.filterByCategoryId)
      .subscribe({
        next: (productList) => {
          this.productList = productList;
          this.change.markForCheck();
          this.loadingService.hide();
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.loadingService.hide();
        },
      });
  }

  onViewProduct(product: ProductListItem) {
    this.viewProduct.emit(product);
  }

  onChangePage(requestedPageIndex: number) {
    this.getProductList(requestedPageIndex, this.productList.pageSize);
    this.changePage.emit(requestedPageIndex);
  }
}
