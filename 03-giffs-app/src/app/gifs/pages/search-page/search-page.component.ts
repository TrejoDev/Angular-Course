import { Component, inject, signal } from '@angular/core';

import { ListComponent } from '../../components/list/list.component';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-search-page',
  imports: [ListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  gifsService = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifsService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });
  }
}
