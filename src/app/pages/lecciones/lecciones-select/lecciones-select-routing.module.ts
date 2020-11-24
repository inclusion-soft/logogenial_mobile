import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeccionesSelectPage } from './lecciones-select.page';

const routes: Routes = [
  {
    path: '',
    component: LeccionesSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeccionesSelectPageRoutingModule {}
