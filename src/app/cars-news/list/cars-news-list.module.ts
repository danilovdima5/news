import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CarsNewsListComponent } from "./cars-news-list.component";
import { DateLabelComponent, LoaderComponent } from "../../shared/components";
import { IntersectionObservableDirective } from "../../shared/directives";
import { CarsNewsListItemComponent } from "./item/cars-news-list-item.component";

@NgModule({
  declarations: [
    CarsNewsListComponent,
    CarsNewsListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CarsNewsListComponent
    }]),
    DateLabelComponent,
    IntersectionObservableDirective,
    LoaderComponent
  ]
})
export class CarsNewsListModule {};
