import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GruposAdminPageRoutingModule } from './grupos-admin-routing.module';

import { GruposAdminPage } from './grupos-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GruposAdminPageRoutingModule
  ],
  declarations: [GruposAdminPage]
})
export class GruposAdminPageModule {}
