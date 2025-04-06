import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { ProductService } from '@products/services/product.service';
import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductService);
  paginationService = inject(PaginationService);

  gender = toSignal<string>(
    this.activatedRoute.params.pipe(map(({ gender }) => gender))
  );

  productResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage(),
    }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        gender: request.gender,
        offset: (request.page - 1) * 9,
      });
    },
  });
}
