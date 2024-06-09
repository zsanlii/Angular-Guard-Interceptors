import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailComponent } from '../../../features/products/components/product-detail/product-detail.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    // CommonModule,
    // BasicLayoutComponent,
    ProductDetailComponent,
  ],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailPageComponent implements OnInit {
  productId!: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getProductIdFromRoute();
  }

  getProductIdFromRoute() {
    this.route.params.subscribe((routeParams) => {
      const productId: number | undefined = Number(routeParams['productId']);

      // false, 0, null, undefined, NaN, '' => false
      if (!productId) {
        this.router.navigate(['/']);
        throw new Error('Product ID is invalid.');
      }

      this.productId = productId;
    });
  }
}
