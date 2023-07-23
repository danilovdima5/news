import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'cars-news',
  loadComponent: () => import('./cars-news/cars-news-list.component').then(c => c.CarsNewsListComponent)
},{
  path: '**',
  redirectTo: 'cars-news'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
