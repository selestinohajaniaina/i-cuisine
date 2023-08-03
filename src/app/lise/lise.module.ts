import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LisePageRoutingModule } from './lise-routing.module';

import { LisePage } from './lise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LisePageRoutingModule
  ],
  declarations: [LisePage]
})
export class LisePageModule {}
