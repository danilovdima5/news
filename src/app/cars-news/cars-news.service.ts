import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, map, of, tap } from 'rxjs';

import { BASE_URL } from '../core/api';

import { ICarsNewsItemPreview, ICarsNewsListResponse } from './list/cars-news-list.model';
import { IPagedItems } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class CarsNewsService {
  private static readonly __ITEMS_BY_FETCH = 10;
  private static readonly __LOCAL_STORAGE_KEY = 'carsNews';

  private readonly __http = inject(HttpClient);

  private readonly __cachedItems: IPagedItems<ICarsNewsItemPreview> = {};
  
  private readonly __selfMadeList$ = new BehaviorSubject<ICarsNewsItemPreview[]>([]);

  constructor() {
    this.__setSelfMadeList();
  }

  get selfMadeList$(): Observable<ICarsNewsItemPreview[]> {
    return this.__selfMadeList$.asObservable();
  }

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

  public setNewItem(value: ICarsNewsItemPreview): void {
    let currentList = this.__getSelfMadeItems() || [];

    currentList.push(value);

    localStorage.setItem(
      CarsNewsService.__LOCAL_STORAGE_KEY,
      JSON.stringify(currentList)
    );

    this.__setSelfMadeList();
  }

  private __setSelfMadeList(): void {
    const list = this.__getSelfMadeItems();

    if (!list) return;

    this.__selfMadeList$.next(list);
  }

  private __getSelfMadeItems(): ICarsNewsItemPreview[] | null {
    try {
      const rawData = localStorage.getItem(CarsNewsService.__LOCAL_STORAGE_KEY);
      const parsedData = JSON.parse(rawData as string);


      if (!Array.isArray(parsedData)) {
        localStorage.removeItem(CarsNewsService.__LOCAL_STORAGE_KEY);

        return null;
      }

      return parsedData;
    } catch {
      return null;
    };
  }
}
