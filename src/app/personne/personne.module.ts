import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonnePageRoutingModule } from './personne-routing.module';

import { PersonnePage } from './personne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonnePageRoutingModule
  ],
  declarations: [PersonnePage]
})
export class PersonnePageModule {}
