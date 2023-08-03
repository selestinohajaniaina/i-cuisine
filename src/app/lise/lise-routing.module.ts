import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LisePage } from './lise.page';

const routes: Routes = [
  {
    path: '',
    component: LisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LisePageRoutingModule {}
