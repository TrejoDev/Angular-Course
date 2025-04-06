import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';

import { ProductService } from '@products/services/product.service';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);

  productIdSlug = this.activatedRoute.snapshot.params['idSlug']; //La pagina no cambia dinamicamente

  productResource = rxResource({
    request: () => ({ idSlug: this.productIdSlug }),
    loader: ({ request }) => {
      return this.productService.getProductByTerm(request.idSlug);
    },
  });
}
