import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service'
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from 'src/app/models/usuario-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', null) slides: IonSlides;

  loginUser = {
    username: 'isabellaromero@gmail.com',
    password: 'isabella.romero'
  };

  registerUser: UsuarioModel =  {
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    avatar: 'av-1.png',
    repetirPassword: null,
    rol: '',
    username: '',
    id: 0,
    roles: []
  };

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiService: UiService ) { }

  ngOnInit() {
    this.slides.lockSwipes( true );
  }

  submitLogin(fRegistro: NgForm ): void {
    if ( fRegistro.form.controls['password'].valid) {
      this.usuarioService.attemptAuth(this.loginUser).subscribe(
        (respuesta: any) => {
          this.usuarioService.guardarToken(respuesta.token);
          this.navCtrl.navigateRoot( '/lecciones-select', { animated: true } );
        }, err => {
          this.uiService.alertaInformativa('Se presentó un erro. Favor comuniquese con el administrador.');
        });
    }
  }

  submitRegistro(fRegistro: NgForm ): void {
    this.registerUser.username = fRegistro.form.controls['username'].value;
    if ( fRegistro.valid ) {
        this.usuarioService.register(this.registerUser).subscribe( (r: any) => {
          this.usuarioService.attemptAuth(this.registerUser).subscribe(
            (respuesta: any) => {
              this.usuarioService.guardarToken(respuesta.token);
              this.navCtrl.navigateRoot( '/lecciones-select', { animated: true } );
            }, err => {
              this.uiService.alertaInformativa('Se presentó un erro. Favor comuniquese con el administrador.');
           });
        }, err => {
            if ( err.status === 404 ) {
              this.uiService.alertaInformativa('No fue posible la conexión con el servidor.');
            }
            if ( err.status === 302 ) {
              this.uiService.alertaInformativa('El usuario ya existe.');
            } else {
              this.uiService.alertaInformativa('Se presentó un erro. Favor comuniquese con el administrador.');
            }
        });
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
