import { Component, OnInit } from '@angular/core';
import { LeccionesService } from 'src/app/services/lecciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lecciones-select',
  templateUrl: './lecciones-select.page.html',
  styleUrls: ['./lecciones-select.page.scss'],
})
export class LeccionesSelectPage implements OnInit {
  lecciones: Observable<any>;
  grupos: Observable<any>;
  niveles: Observable<any>;
  temas: Observable<any>;
  usuario: UsuarioModel = new UsuarioModel();
  formSelected = '';
  grupoSeleccionado = 0;
  nivelSeleccionado = 0;
  temaSeleccionado = 0;
  constructor(private leccionesService: LeccionesService,
              private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private router: Router) { }

  ngOnInit() {
    return Observable.fromPromise(this.handleCargarSeccionPertinente());
  }

  private async handleCargarSeccionPertinente()  {
    const informacionUsuario = await this.usuarioService.getInformacionPromise();
    this.usuario = informacionUsuario as any;
    if (this.usuario === null) {
      //this.router.navigate['/login'];
      this.navCtrl.navigateRoot( '/login', { animated: true } );
      return;
    }
    const ultimoAvance = await this.usuarioService.getLlave('ultimoAvance') as any;
    if (ultimoAvance !== null && ultimoAvance !== '')  {
      const ultimoAvanceJson = JSON.parse(ultimoAvance);
      if (ultimoAvanceJson.formulario === 'leccion') {
        const tema = await this.usuarioService.getLlave('temas');
        this.setSeleccionarFormulario('lecciones');
        this.cargarLecciones(tema);
      }
    } else {
      this.setSeleccionarFormulario('grupos');
      this.cargarGrupos();
      this.usuarioService.setNotificarInformacionUsuario(this.usuario);
    }
  }

  async cargarGrupos() {
    this.leccionesService.findAllGroupsByEstudianteId(this.usuario.id).subscribe( grupos => {
      this.grupos = grupos;
    });
  }

  onSeleccionarGrupo(grupo: any) {
    this.cargarNiveles(grupo.id);
  }

  cargarNiveles(grupoId) {
    this.grupoSeleccionado = grupoId;
    this.leccionesService.findAllNivelesByGrupoId(grupoId).subscribe( niveles => {
      this.niveles = niveles;
      this.setSeleccionarFormulario('niveles');
    });
  }

  onSeleccionarNivel(grupoNivel: any) {
    this.cargarTemas(grupoNivel.id);
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  cargarTemas(grupoNivelId) {
    this.nivelSeleccionado = grupoNivelId;
    this.leccionesService.findAllTemasByGrupoNivelId(grupoNivelId).subscribe( temas => {
      this.temas = temas;
      this.setSeleccionarFormulario('temas');
    });
  }

  volverGrupos() {
    this.setSeleccionarFormulario('grupos');
  }

  volverNiveles() {
    this.setSeleccionarFormulario('niveles');
  }

  volverTemas() {
    this.setSeleccionarFormulario('temas');
  }

  onSeleccionarTema(grupoNivelTemaId) {
    this.cargarLecciones(grupoNivelTemaId.id);
  }

  setSeleccionarFormulario(nombreForm: string) {
    this.formSelected = nombreForm;
    let valor = this.usuario.id;
    switch (nombreForm) {
      case 'temas':
        valor = this.temaSeleccionado;
        break;
      case 'niveles':
        valor = this.nivelSeleccionado;
        break;
      case 'grupos':
        valor = this. grupoSeleccionado;
        break;
    }
    if (valor > 0) {
      this.usuarioService.guardarLlaveValor(nombreForm, valor + '');
    }
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  cargarLecciones(grupoNivelTemaId) {
    this.temaSeleccionado = grupoNivelTemaId;
    this.leccionesService.findAllLeccionesByGrupoNivelTemaId(grupoNivelTemaId).subscribe( lecciones => {
      this.lecciones = lecciones;
      this.setSeleccionarFormulario('lecciones');
    });
  }

  onSeleccionarLeccion(leccion) {
    // tslint:disable-next-line: no-unused-expression
    this.router.navigate['/leccion-ejecucion'];
  }
}
