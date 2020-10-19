import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MensajeRespuestaModalPage } from './mensaje-respuesta-modal/mensaje-respuesta-modal.page';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptor } from './seguridad/auth-interceptor';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { MensajeRespuestaModalPageModule } from './mensaje-respuesta-modal/mensaje-respuesta-modal.module';
import { RespuestaPreguntaModalPageModule } from './pages/respuesta-pregunta-modal/respuesta-pregunta-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    MensajeRespuestaModalPageModule,
    RespuestaPreguntaModalPageModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(
      {
        name: 'logogenius_db',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }
    ),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
