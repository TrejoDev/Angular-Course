import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInfoComponent } from './country-info/country-info.component';

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, CountryInfoComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchByCode(request.code);
    },
  });

  //* query = toSignal( forma del proyecto anterior
  //   inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  // );
}
