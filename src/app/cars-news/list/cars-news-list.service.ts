import { Injectable, inject } from '@angular/core';

import { BehaviorSubject, Observable, Subject, catchError, combineLatest, map, of, switchMap, tap } from 'rxjs';

import { CarsNewsService } from '../cars-news.service';
import { ICarsNewsItemPreview } from './cars-news-list.model';


@Injectable()
export class CarsNewsListService {
  private readonly __carsNewsService = inject(CarsNewsService)

  private readonly __currentPage$ = new BehaviorSubject(1);

  private readonly __isLoading$ = new BehaviorSubject(false);

  private __cachedList: ICarsNewsItemPreview[] = [];

  public get mainList$(): Observable<ICarsNewsItemPreview[]> {
    return this.__currentPage$.pipe(
      tap(() => this.__isLoading$.next(true)),
      switchMap(currentPage => {
        return this.__carsNewsService.getList(currentPage);
      }),
      catchError(() => of([])),
      map(result => [...this.__cachedList, ...result]),
      tap(result => {
        this.__cachedList = result;
        this.__isLoading$.next(false);
      }),
    );
  }

  public get selfMadeList$(): Observable<ICarsNewsItemPreview[]> {
    return this.__carsNewsService.selfMadeList$;
  }

  public get isLoading$(): Observable<boolean> {
    return this.__isLoading$.asObservable();
  }

  public goToNextPage(): void {
    if (this.__isLoading$.value) return;

    const currentPage = this.__currentPage$.value;

    this.__currentPage$.next(currentPage + 1);
  }
}
