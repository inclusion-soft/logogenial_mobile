import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespuestaPreguntaModalPageRoutingModule } from './respuesta-pregunta-modal-routing.module';

import { RespuestaPreguntaModalPage } from './respuesta-pregunta-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespuestaPreguntaModalPageRoutingModule
  ],
  declarations: [RespuestaPreguntaModalPage]
})
export class RespuestaPreguntaModalPageModule {}
