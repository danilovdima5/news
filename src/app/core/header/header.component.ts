import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  template: `
    <img src="assets/icons/logo.svg" alt="Лого" />

    <p class="header__title"> ПОРТАЛ НОВОСТЕЙ </p>

    <button class="btn btn-ball btn-ball--lg btn-black-100" (click)="onNewBtnClick()" >
      <img src="assets/icons/plus.svg" alt="Добавить"/>
    </button>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly service = inject(HeaderService);

  onNewBtnClick() {
    this.service.newBtnClicked.next();
  }
}
