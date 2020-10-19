import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeccionEjecucionPageRoutingModule } from './leccion-ejecucion-routing.module';

import { LeccionEjecucionPage } from './leccion-ejecucion.page';
import { RespuestaPreguntaModalPageModule } from '../../respuesta-pregunta-modal/respuesta-pregunta-modal.module';
import { RespuestaPreguntaModalPage } from '../../respuesta-pregunta-modal/respuesta-pregunta-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeccionEjecucionPageRoutingModule,
    //RespuestaPreguntaModalPageModule
  ],
  declarations: [LeccionEjecucionPage],
  //entryComponents: [RespuestaPreguntaModalPage]
})
export class LeccionEjecucionPageModule {}
