import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensajeRespuestaModalPageRoutingModule } from './mensaje-respuesta-modal-routing.module';

import { MensajeRespuestaModalPage } from './mensaje-respuesta-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajeRespuestaModalPageRoutingModule
  ],
  declarations: [MensajeRespuestaModalPage],
  exports: [MensajeRespuestaModalPage]
})
export class MensajeRespuestaModalPageModule {}
