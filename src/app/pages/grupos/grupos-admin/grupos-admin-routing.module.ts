import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposAdminPage } from './grupos-admin.page';

const routes: Routes = [
  {
    path: '',
    component: GruposAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposAdminPageRoutingModule {}
