import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IModalValue } from './modal-value.model';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  private readonly modalToShow$ = new BehaviorSubject<IModalValue | null>(null);

  dismiss(): void {
    this.modalToShow$.next(null);
  }

  show(value: IModalValue): void {
    this.modalToShow$.next(value);
  }

  get currentModal$(): Observable<IModalValue | null> {
    return this.modalToShow$.asObservable();
  }

  get hasActiveModal(): boolean {
    return !!this.modalToShow$.value;
  }
}
