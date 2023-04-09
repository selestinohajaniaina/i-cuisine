import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoryPage } from './favory.page';

const routes: Routes = [
  {
    path: '',
    component: FavoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoryPageRoutingModule {}
