import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeccionEjecucionPage } from './leccion-ejecucion.page';

const routes: Routes = [
  {
    path: '',
    component: LeccionEjecucionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeccionEjecucionPageRoutingModule {}
