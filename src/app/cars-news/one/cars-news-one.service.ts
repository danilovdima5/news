import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, catchError } from 'rxjs';

import { CarsNewsService } from '../cars-news.service';
import { BASE_URL } from 'src/app/core/api';
import { ICarsNewsDetails } from './cars-news-one.model';

@Injectable()
export class CarsNewsOneService {
  private readonly __carsNewsService = inject(CarsNewsService);
  private readonly __activatedRoute = inject(ActivatedRoute);
  private readonly __route = inject(Router);
  private readonly __http = inject(HttpClient);

  get item$(): Observable<ICarsNewsDetails> {
    const item = this.__carsNewsService.getItemById(
      +this.__activatedRoute.snapshot.params['id']
    );

    if (!item) {
      this.__route.navigateByUrl('/cars-news');
      return EMPTY;
    }

    return this.__http.get<ICarsNewsDetails>(`${BASE_URL}/item/${item.url}`).pipe(
      catchError(() => {
        this.__route.navigateByUrl('/cars-news');
        return EMPTY;
      })
    );
  }
}
