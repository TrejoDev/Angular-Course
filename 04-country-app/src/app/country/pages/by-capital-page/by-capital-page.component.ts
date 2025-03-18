import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');
  params = 'capital';

  countryResource = rxResource({
    // *Si trabajamos con rxResource, trabajamos en base a observables
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      return this.countryService.searchBy(request.query, this.params);
    },
  });

  // countryResource = resource({  experimental
  //   *Si trabajamos con resource, trabajamos en base a promesas
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     //La request q pasa como arg, es la misma realizada prev en el callback anterior
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchBy(request.query, this.params)
  //     );
  //   },
  // });

  // isLoading = signal<boolean>(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       //convertir a arr para no perder la referencia al this
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     },
  //   });
  // }
}
