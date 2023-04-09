import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoryPageRoutingModule } from './favory-routing.module';

import { FavoryPage } from './favory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoryPageRoutingModule
  ],
  declarations: [FavoryPage]
})
export class FavoryPageModule {}
