import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = ['Americas', 'Africa', 'Asia', 'Europe', 'Oceania'];

  get regions() {
    return [...this._regions]; //rompo la referencia al obj
  }

  getCountryByRegions(region: string): Observable<Country[]> {
    if (!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<Country>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    //Recibimos un arreglo de country codes
    if (!countryCodes || countryCodes.length === 0) return of([]);

    const countriesReq: Observable<Country>[] = [];

    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesReq.push(request);
    });

    return combineLatest(countriesReq); // retornamos todas las peticiones cuando sean resueltas, si una de las peticiones falla todas fallan
  }
}
