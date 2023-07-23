import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CarsNewsListService } from './cars-news-list.service';

import { DateLabelComponent, LoaderComponent } from '../../shared/components';
import { IntersectionObservableDirective } from '../../shared/directives';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cars-news-list',
  templateUrl: './cars-news-list.component.html',
  styleUrls: ['./cars-news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarsNewsListService],
  imports: [
    NgFor,
    NgIf,
    DateLabelComponent,
    IntersectionObservableDirective,
    LoaderComponent,
    RouterModule
  ],
  standalone: true
})
export class CarsNewsListComponent {
  private readonly __service = inject(CarsNewsListService);

  public readonly list = toSignal(this.__service.list$, {
    initialValue: []
  });

  public readonly isLoading = toSignal(this.__service.isLoading$);

  goToNextPage() {
    this.__service.goToNextPage();
  }
}
