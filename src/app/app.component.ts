import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';
import { UsuarioModel } from './models/usuario-model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  private usuario: UsuarioModel = new UsuarioModel();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usuarioService: UsuarioService
  ) {
    this.initializeApp();
    this.usuario = new UsuarioModel();
    this.usuario.nombre = 'anonimo';
    this.usuario.email = 'nombre@mail.co';
    this.usuario.avatar = 'av-5.png';
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
    this.usuarioService.userDetail$.subscribe( (usuario: UsuarioModel) => {
      this.usuario = usuario;
    }, err => {alert('error'); });
  }

  onClicLogOut() {
    this.usuarioService.logout();
  }

  getCampo(campo: string) {
    let dato = '';
    switch(campo) {
      case 'avatar':
        if(this.usuario === null ) {
          dato = 'av-5.png';
        } else {
          dato = this.usuario.avatar;
        }
        break;
      case 'email':
        if(this.usuario === null ) {
          dato = 'anonimouse@mail.co';
        } else {
          dato = this.usuario.email;
        }
        break;
    }
    return dato;
  }
}
