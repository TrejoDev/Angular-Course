import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '../../pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  
  `,
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  swiper: Swiper | undefined = undefined;

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }

    if (!this.swiper) return;

    const paginationEl: HTMLDivElement =
      this.swiperDiv().nativeElement?.querySelector('.swiper-pagination');

    paginationEl.innerHTML = '';

    setTimeout(() => {
      this.swiperInit();
    }, 100);
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
