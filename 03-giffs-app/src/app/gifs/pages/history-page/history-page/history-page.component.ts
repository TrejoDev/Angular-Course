import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { GifsService } from 'src/app/gifs/services/gifs.service';
import { ListComponent } from 'src/app/gifs/components/list/list.component';

@Component({
  selector: 'gif-history-page',
  templateUrl: './history-page.component.html',
  imports: [ListComponent],
})
export default class HistoryPageComponent {
  gifsService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()));
}
