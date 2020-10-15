import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeccionesSelectPageRoutingModule } from './lecciones-select-routing.module';

import { LeccionesSelectPage } from './lecciones-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeccionesSelectPageRoutingModule
  ],
  declarations: [LeccionesSelectPage]
})
export class LeccionesSelectPageModule {}
