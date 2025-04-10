import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@auth/interfaces/user.interface';
import {
  Gender,
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

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User,
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productCache: { [key: string]: Product } = {};
  private productsCache = new Map<string, ProductResponse>();

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

  getProductById(id: string): Observable<Product> {
    if (id === 'new') {
      return of(emptyProduct);
    }

    if (this.productCache[id]) {
      return of(this.productCache[id]);
    }

    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap((resp) => (this.productCache[id] = resp)));
  }

  updateProduct(
    id: string,
    productLike: Partial<Product>
  ): Observable<Product> {
    return this.http
      .patch<Product>(`${baseUrl}/products/${id}`, productLike)
      .pipe(tap((p) => this.updatedProductCache(p)));
  }

  createProduct(productLike: Partial<Product>): Observable<Product> {
    return this.http
      .post<Product>(`${baseUrl}/products`, productLike)
      .pipe(tap((p) => this.updatedProductCache(p)));
  }

  updatedProductCache(product: Product) {
    const productId = product.id;

    this.productCache[productId] = product;

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map(
        (currentProduct) => {
          return currentProduct.id === productId ? product : currentProduct;
        }
      );
    });

    console.log('Updated cache');
  }
}
