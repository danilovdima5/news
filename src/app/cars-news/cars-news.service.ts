import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map, of, tap } from 'rxjs';

import { BASE_URL } from '../core/api';

import { ICarsNewsItemPreview, ICarsNewsListResponse } from './list/cars-news-list.model';
import { IPagedItems } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class CarsNewsService {
  private static readonly __ITEMS_BY_FETCH = 10;

  private readonly __http = inject(HttpClient);

  private readonly __cachedItems: IPagedItems<ICarsNewsItemPreview> = {};
  
  public getList(page: number): Observable<ICarsNewsItemPreview[]> {
    const cached = this.__cachedItems[page];

    if (cached) return of(cached);

    return this.__http.get<ICarsNewsListResponse>(
      `${BASE_URL}/${page}/${CarsNewsService.__ITEMS_BY_FETCH}`
    ).pipe(
      map(response => response.news),
      tap(items => (this.__cachedItems[page] = items))
    );
  }

  public getItemById(id: ICarsNewsItemPreview['id']): ICarsNewsItemPreview | undefined {
    return Object.values(this.__cachedItems).flat().find(item => item.id === id);
  }
}
