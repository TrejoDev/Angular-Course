import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductResponse,
} from '@products/interfaces/product.interface';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductResponse>();
  private productCache: { [key: string]: Product } = {};

  getProducts(options: Options): Observable<ProductResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
    }

    return this.http
      .get<ProductResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(tap((resp) => this.productsCache.set(key, resp)));
  }

  getProductByTerm(term: string): Observable<Product> {
    if (this.productCache[term]) {
      return of(this.productCache[term]);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${term}`)
      .pipe(tap((resp) => (this.productCache[term] = resp)));
  }
}
