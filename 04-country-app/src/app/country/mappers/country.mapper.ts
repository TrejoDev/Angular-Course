import { Injectable } from '@angular/core';
import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { Translation } from '../interfaces/rest-countries.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryMapper {
  resToCountry(restCountries: RESTCountry): Country {
    return {
      cca2: restCountries.cca2,
      flag: restCountries.flag,
      flagSvg: restCountries.flags.svg,
      name: restCountries.translations['spa'].official ?? 'No spanish name',
      capital: restCountries.capital.join(','),
      population: restCountries.population,
      region: restCountries.region,
      subRegion: restCountries.subregion,
    };
  }
  resToCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.resToCountry);
  }
}
