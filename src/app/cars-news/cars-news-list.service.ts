import { Injectable, inject } from '@angular/core';

import { BehaviorSubject, Observable, Subject, catchError, map, of, pairwise, startWith, switchMap, tap } from 'rxjs';

import { CarsNewsService } from '../core/services/cars-news.service';

import { ICarsNewsItem } from './cars-news.models';

@Injectable()
export class CarsNewsListService {
  private readonly __carsNewsService = inject(CarsNewsService)

  private __currentPage$ = new BehaviorSubject(1);

  private __isLoading$ = new BehaviorSubject(false);

  private __cachedList: ICarsNewsItem[] = [];

  public get list$(): Observable<ICarsNewsItem[]> {
    return this.__currentPage$.pipe(
      tap(() => this.__isLoading$.next(true)),
      switchMap(currentPage => {
        return this.__carsNewsService.fetchConfig(currentPage);
      }),
      map(config => config.news),
      catchError(() => of([] as ICarsNewsItem[])),
      map(result => [...this.__cachedList, ...result]),
      tap(result => {
        this.__cachedList = result;
        this.__isLoading$.next(false);
      }),
    );
  }

  get isLoading$(): Observable<boolean> {
    return this.__isLoading$.asObservable();
  }

  goToNextPage(): void {
    if (this.__isLoading$.value) return;

    const currentPage = this.__currentPage$.value;

    this.__currentPage$.next(currentPage + 1);
  }
}
