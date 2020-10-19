import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespuestaPreguntaModalPage } from './respuesta-pregunta-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RespuestaPreguntaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, RespuestaPreguntaModalPage],
})
export class RespuestaPreguntaModalPageRoutingModule {}
