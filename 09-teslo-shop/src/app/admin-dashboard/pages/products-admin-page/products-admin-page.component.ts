import { Component, inject, signal } from '@angular/core';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '@products/services/product.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'products-admin-page',
  imports: [ProductTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  private productService = inject(ProductService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage(),
      limit: this.productsPerPage(),
    }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: (request.page - 1) * 9,
        limit: request.limit,
      });
    },
  });
}
