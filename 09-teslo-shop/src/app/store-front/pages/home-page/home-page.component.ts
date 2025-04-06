import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/product.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private productService = inject(ProductService);
  paginationService = inject(PaginationService);

  productResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: (request.page - 1) * 9,
      });
    },
  });
}
