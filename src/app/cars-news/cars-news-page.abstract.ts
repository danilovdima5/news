import { DestroyRef, Directive, OnInit, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { HeaderService } from "../core/header/header.service";
import { ModalsService } from "../core/modal-container/modals.service";
import { CarsNewsNewFormComponent } from "./new/form/cars-news-new-form.component";

@Directive()
export abstract class CardNewsPageComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  private readonly modalsService = inject(ModalsService);

  protected readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.headerService.newBtnClicked
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.modalsService.show({
          class: CarsNewsNewFormComponent
        });
      });
  }
}