import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductDetails } from '../../models/product-details';
import { VatPipe } from '../../pipes/vat.pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, VatPipe, HighlightDirective],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  // OnPush: Dışarıdan ilgili Input değiştiğinde değişikleri algılar ve component'i yeniden render eder. changeDetection tetiklenmesi için 1. olay.
  @Input() productId!: number;

  productDetails!: ProductDetails;

  constructor(
    private productsService: ProductsService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    this.productsService.getById(this.productId).subscribe((productDetail) => {
      this.productDetails = productDetail;

      // OnPush: ChangeDetectorRef.markForCheck() metodu ile değişiklikleri algılar ve component'i yeniden render eder. changeDetection tetiklenmesi için 3. olay.
      this.change.markForCheck();
    });
  }

  // OnPush: Kullanıcı template üzerinden bir olay tetiklediğinde değişikleri algılar ve component'i yeniden render eder. changeDetection tetiklenmesi için 2. olay.
  onButtonClick() {
    throw new Error('Method not implemented.');
  }
}
