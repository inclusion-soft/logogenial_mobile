import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespuestaPreguntaModalPageRoutingModule } from './respuesta-pregunta-modal-routing.module';

import { RespuestaPreguntaModalPage } from './respuesta-pregunta-modal.page';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespuestaPreguntaModalPageRoutingModule,
    NgCircleProgressModule.forRoot(),
  ],
  declarations: [RespuestaPreguntaModalPage],
  exports: [RespuestaPreguntaModalPage]
})
export class RespuestaPreguntaModalPageModule {}
