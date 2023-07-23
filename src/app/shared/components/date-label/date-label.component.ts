import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DAY_MONTH_YEAR_FORMAT } from '../../../core/models';

@Component({
  selector: 'app-date-label',
  template: `
    {{ date | date : DAY_MONTH_YEAR_FORMAT }}
  `,
  styleUrls: ['./date-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DatePipe]
})
export class DateLabelComponent {
  @Input({required: true}) date!: string;

  public readonly DAY_MONTH_YEAR_FORMAT = DAY_MONTH_YEAR_FORMAT;
}
