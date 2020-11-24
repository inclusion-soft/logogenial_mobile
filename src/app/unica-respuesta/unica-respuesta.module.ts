import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnicaRespuestaPageRoutingModule } from './unica-respuesta-routing.module';

import { UnicaRespuestaPage } from './unica-respuesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnicaRespuestaPageRoutingModule
  ],
  declarations: [UnicaRespuestaPage]
})
export class UnicaRespuestaPageModule {}
