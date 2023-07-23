import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { CarsNewsOneService } from './cars-news-one.service';
import { DateLabelComponent } from './../../shared/components/date-label.component';

@Component({
  selector: 'app-cars-news-one',
  templateUrl: './cars-news-one.component.html',
  styleUrls: ['./cars-news-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [CarsNewsOneService],
  imports: [NgIf, AsyncPipe, DateLabelComponent]
})
export class CarsNewsOneComponent {
  public readonly item$ = inject(CarsNewsOneService).item$;
}
