import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ModalService } from '../modal/modal.service';
import { NewsFormComponent } from '../new-news-form/new-news-form.component';

@Component({
  selector: 'app-header',
  template: `
    <img src="assets/icons/logo.svg" alt="Лого" />

    <p class="header__title"> ПОРТАЛ НОВОСТЕЙ </p>

    <button class="btn btn-ball btn-ball--lg btn-black-100" (click)="openNewModal()" >
      <img src="assets/icons/plus.svg" alt="Добавить"/>
    </button>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private readonly modalService = inject(ModalService);

  openNewModal() {
    this.modalService.show({
      class: NewsFormComponent,
      data: null
    });
  }
}
