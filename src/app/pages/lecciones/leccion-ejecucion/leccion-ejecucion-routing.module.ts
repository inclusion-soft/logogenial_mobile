import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeccionEjecucionPage } from './leccion-ejecucion.page';
import { RespuestaPreguntaModalPage } from '../../respuesta-pregunta-modal/respuesta-pregunta-modal.page';
import { RespuestaPreguntaModalPageModule } from '../../respuesta-pregunta-modal/respuesta-pregunta-modal.module';
import { MensajeRespuestaModalPage } from 'src/app/mensaje-respuesta-modal/mensaje-respuesta-modal.page';
import { MensajeRespuestaModalPageModule } from 'src/app/mensaje-respuesta-modal/mensaje-respuesta-modal.module';

const routes: Routes = [
  {
    path: '',
    component: LeccionEjecucionPage
  }
];

@NgModule({
  //entryComponents: [MensajeRespuestaModalPageModule],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeccionEjecucionPageRoutingModule {}
