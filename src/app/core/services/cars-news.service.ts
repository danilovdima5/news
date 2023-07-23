import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ICarsNewsListResponse } from '../models';
import { BASE_URL } from '../api';

@Injectable({
  providedIn: 'root'
})
export class CarsNewsService {
  private static __ITEMS_BY_FETCH = 10;

  private readonly __http = inject(HttpClient);

  public fetchConfig(page: number): Observable<ICarsNewsListResponse> {
    return this.__http.get<ICarsNewsListResponse>(
      `${BASE_URL}/${page}/${CarsNewsService.__ITEMS_BY_FETCH}`
    );
  }
}
