import { Component, inject, linkedSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/regions.type';

function validateQueryParams(queryParams: string): Region {
  queryParams = queryParams.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParams] ?? 'Africa';
}

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  private countryService = inject(CountryService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  private params = 'region';

  query = linkedSignal<Region>(() => validateQueryParams(this.queryParams));

  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      this.router.navigate(['country/by-region'], {
        queryParams: {
          query: request.query,
        },
      });

      return this.countryService.searchBy(request.query, this.params);
    },
  });
}
