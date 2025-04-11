import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from '../../../../products/components/product-carousel/product-carousel.component';
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from '../../../../shared/components/pagination/form-error-label/form-error-label.component';
import { ProductService } from '@products/services/product.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [
    ProductCarouselComponent,
    ReactiveFormsModule,
    FormErrorLabelComponent,
  ],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product = input.required<Product>();

  private router = inject(Router);
  private fb = inject(FormBuilder);

  private productService = inject(ProductService);
  wasSaved = signal(false);

  imageFilesList: FileList | undefined = undefined;
  tempImages = signal<string[]>([]);
  imageToCarousel = computed(() => {
    const currentProductImages = [
      ...this.product().images,
      ...this.tempImages(),
    ];
    return currentProductImages;
  });

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [['']],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
    // this.productForm.patchValue(formLike as any);
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLocaleLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? [],
    };

    if (this.product().id === 'new') {
      const product = await firstValueFrom(
        this.productService.createProduct(productLike, this.imageFilesList)
      );

      console.log('Created product');
      this.router.navigate(['admin/product', product.id]);
    } else {
      await firstValueFrom(
        this.productService.updateProduct(
          this.product().id,
          productLike,
          this.imageFilesList
        )
      );

      console.log('Updated product');
    }

    this.wasSaved.set(true);

    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }

  inFilesChanged(event: Event) {
    const filesList = (event.target as HTMLInputElement).files;
    this.imageFilesList = filesList ?? undefined;

    const imgUrls = Array.from(filesList ?? []).map((file) =>
      URL.createObjectURL(file)
    );

    this.tempImages.set(imgUrls);
  }
}
