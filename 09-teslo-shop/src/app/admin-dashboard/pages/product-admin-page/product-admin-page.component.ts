import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { map } from 'rxjs';
import { ProductDetailComponent } from '../product-admin-page/product-detail/product-detail.component';

@Component({
  selector: 'product-admin-page',
  imports: [ProductDetailComponent],
  templateUrl: './product-Admin-page.component.html',
})
export class ProductAdminPageComponent {
  private productService = inject(ProductService);
  private activateRoute = inject(ActivatedRoute);
  router = inject(Router);

  productId = toSignal(
    this.activateRoute.params.pipe(map((params) => params['id']))
  );

  productResource = rxResource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => {
      return this.productService.getProductById(request.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin']);
    }
  });
}
