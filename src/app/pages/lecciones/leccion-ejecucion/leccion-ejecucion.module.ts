import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeccionEjecucionPageRoutingModule } from './leccion-ejecucion-routing.module';

import { LeccionEjecucionPage } from './leccion-ejecucion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeccionEjecucionPageRoutingModule
  ],
  declarations: [LeccionEjecucionPage]
})
export class LeccionEjecucionPageModule {}
