import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnicaRespuestaPage } from './unica-respuesta.page';

const routes: Routes = [
  {
    path: '',
    component: UnicaRespuestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnicaRespuestaPageRoutingModule {}
