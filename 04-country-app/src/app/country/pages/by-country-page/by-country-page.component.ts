import { Component, inject, linkedSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountryService } from '../../services/country.service';
import { ListComponent } from '../../components/list/list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  private countryService = inject(CountryService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParams);
  private params = 'name';

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      this.router.navigate(['country/by-country'], {
        queryParams: {
          query: request.query,
        },
      });

      return this.countryService.searchBy(request.query, this.params);
    },
  });
}
function LinkedSignal(arg0: () => string) {
  throw new Error('Function not implemented.');
}
