import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private countryMapper = inject(CountryMapper);
  private queryCache = new Map<string, Country[]>(); //Almacenamos la data en cache => Map({key: value})

  searchBy(query: string, params: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCache.has(query)) {
      return of(this.queryCache.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/${params}/${query}`).pipe(
      map((restCountries) => this.countryMapper.resToCountries(restCountries)),
      tap((countries) => this.queryCache.set(query, countries)),
      catchError((error) => {
        return throwError(
          () => new Error(`Not found any ${params} with ${query}`)
        );
      })
    );
  }

  searchByCode(code: string): Observable<Country | undefined> {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((restCountries) => this.countryMapper.resToCountries(restCountries)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        return throwError(
          () => new Error(`Not found any country with ${code}`)
        );
      })
    );
  }
}
