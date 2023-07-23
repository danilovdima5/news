import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ModalService } from './core/modal/modal.service';
import { ModalHostDirective } from './core/modal/modal-host.directive';

@Component({
  selector: 'app-root',
  template: `
    <section class="header-wrapper">
      <app-header class="root-element"></app-header>

      <div class="hr"></div>
    </section>

    <section class="pages root-element">
      <router-outlet></router-outlet>
    </section>

    <app-modal-container></app-modal-container>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
