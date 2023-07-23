import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CarsNewsListService } from './cars-news-list.service';

@Component({
  selector: 'app-cars-news-list',
  templateUrl: './cars-news-list.component.html',
  styleUrls: ['./cars-news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarsNewsListService]
})
export class CarsNewsListComponent {
  private readonly __service = inject(CarsNewsListService);

  public readonly mainList = toSignal(this.__service.mainList$, {
    initialValue: []
  });

  public readonly selfMadeList = toSignal(this.__service.selfMadeList$, {
    initialValue: []
  });

  public readonly isLoading = toSignal(this.__service.isLoading$);

  ngOnInit() {
    this.__service.selfMadeList$.subscribe(console.log);
  }

  goToNextPage() {
    this.__service.goToNextPage();
  }
}
