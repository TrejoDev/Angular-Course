import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'gif-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifsService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; // how px are you scrolled
    const clientHeight = scrollDiv.clientHeight; //screen view  height
    const scrollHeight = scrollDiv.scrollHeight; //max scroll height

    const isAtBotton = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBotton) {
      // todo: loading next page
      this.gifsService.loadTrendingGifs();
    }
  }
}
