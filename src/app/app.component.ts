import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  // Otros elementos por defecto
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Lecciones',
      url: '/lecciones-select',
      icon: 'game-controller'
    },
    {
      title: 'Resultados',
      url: '/resultado-admin',
      icon: 'stats-chart'
    },
    {
      title: 'Grupos',
      url: '/grupos-admin',
      icon: 'home'
    },
    {
      title: 'Mi perfil',
      url: '/perfil-edit',
      icon: 'person'
    },
    // {
    //   title: 'Cerrar sesión',
    //   url: '/cerrar-sesion',
    //   icon: 'log-out'
    // }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usuarioService: UsuarioService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  onClicLogOut() {
    this.usuarioService.logout();
  }
}
