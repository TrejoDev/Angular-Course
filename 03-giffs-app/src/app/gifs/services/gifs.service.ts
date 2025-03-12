import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { environment } from '@environments/environment';

const GIF_KEY = 'gifs';

function loadFromLocalStorage() {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  return JSON.parse(gifsFromLocalStorage);
}

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);

  tredingGifs = signal<Gif[]>([]);
  tredingGifsLoadind = signal<boolean>(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocaleStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.gihpyUrl}/gifs/trending`, {
        params: {
          api_key: environment.gihpyApiKey,
          limit: 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifsArray(resp.data);
        this.tredingGifs.set(gifs);
        this.tredingGifsLoadind.set(false);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.gihpyUrl}/gifs/search`, {
        params: {
          api_key: environment.gihpyApiKey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifsArray(items)),

        // History
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLocaleLowerCase()]: items,
          }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
