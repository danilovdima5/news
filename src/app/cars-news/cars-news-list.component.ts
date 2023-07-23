import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CarsNewsListService } from './cars-news-list.service';

import { DateLabelComponent, LoaderComponent } from '../shared/components';
import { IntersectionObservableDirective } from '../shared/directives';

@Component({
  selector: 'app-cars-news-list',
  templateUrl: './cars-news-list.component.html',
  styleUrls: ['./cars-news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarsNewsListService],
  imports: [NgFor, NgIf, DateLabelComponent, IntersectionObservableDirective, LoaderComponent],
  standalone: true
})
export class CarsNewsListComponent {
  public readonly list = toSignal(this.service.list$, {
    initialValue: []
  });

  public readonly isLoading = toSignal(this.service.isLoading$);

  constructor(
    private readonly service: CarsNewsListService
  ) {}

  goToNextPage() {
    this.service.goToNextPage();
  }
}
