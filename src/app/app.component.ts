import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
