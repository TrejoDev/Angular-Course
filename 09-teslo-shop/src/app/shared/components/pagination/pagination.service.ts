import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((p) => (p.get('page') ? +p.get('page')! : 1)),
      map((pg) => (isNaN(pg) ? 1 : pg))
    ),
    {
      initialValue: 1,
    }
  );
}
