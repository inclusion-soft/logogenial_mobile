import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajeRespuestaModalPage } from './mensaje-respuesta-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MensajeRespuestaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajeRespuestaModalPageRoutingModule {}
