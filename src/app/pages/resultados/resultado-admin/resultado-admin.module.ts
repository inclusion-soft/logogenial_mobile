import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultadoAdminPageRoutingModule } from './resultado-admin-routing.module';

import { ResultadoAdminPage } from './resultado-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultadoAdminPageRoutingModule
  ],
  declarations: [ResultadoAdminPage]
})
export class ResultadoAdminPageModule {}
