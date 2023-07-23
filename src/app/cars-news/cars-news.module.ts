import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{
  path: '',
  loadComponent: () => import('./list/cars-news-list.component').then(c => c.CarsNewsListComponent)
},{
  path: ':id',
  loadComponent: () => import('./one/cars-news-one.component').then(c => c.CarsNewsOneComponent)
},{
  path: '**',
  redirectTo: '',
  'pathMatch': 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CarsNewsModule {};
