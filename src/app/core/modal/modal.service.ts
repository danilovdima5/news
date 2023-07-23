import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IModalToShow } from './modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly modalToShow$ = new BehaviorSubject<IModalToShow | null>(null);

  dismiss(): void {
    this.modalToShow$.next(null);
  }

  show(value: IModalToShow): void {
    this.modalToShow$.next(value);
  }

  get currentModal$(): Observable<IModalToShow | null> {
    return this.modalToShow$.asObservable();
  }

  get hasActiveModal(): boolean {
    return !!this.modalToShow$.value;
  }
}
