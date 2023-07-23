import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <img src="assets/icons/logo.svg" alt="Лого" />

    <p class="header__title"> ПОРТАЛ НОВОСТЕЙ </p>

    <button class="btn btn-ball btn-ball--lg btn-black-100" disabled >
      <img src="assets/icons/plus.svg" alt="Добавить"/>
    </button>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
