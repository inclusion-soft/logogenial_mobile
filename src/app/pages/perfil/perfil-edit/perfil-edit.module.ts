import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilEditPageRoutingModule } from './perfil-edit-routing.module';

import { PerfilEditPage } from './perfil-edit.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilEditPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PerfilEditPage]
})
export class PerfilEditPageModule {}
