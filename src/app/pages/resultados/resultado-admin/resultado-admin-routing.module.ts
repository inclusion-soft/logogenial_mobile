import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultadoAdminPage } from './resultado-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadoAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultadoAdminPageRoutingModule {}
