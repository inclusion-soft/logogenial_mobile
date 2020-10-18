import { Component, OnInit } from '@angular/core';
import { LeccionesService } from 'src/app/services/lecciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LeccionModel } from 'src/app/models/leccion-model';
import { BasicModel } from 'src/app/models/basic-model';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { Router } from '@angular/router';

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
  formSelected = 'grupos';
  constructor(private leccionesService: LeccionesService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.cargarGrupos();
  }

  async cargarGrupos() {
    const informacionUsuario = await this.usuarioService.getInformacionPromise();
    const info = informacionUsuario as any;
    this.usuario = info;
    this.leccionesService.findAllGroupsByEstudianteId(this.usuario.id).subscribe( grupos => {
      this.grupos = grupos;
    });
  }

  onSeleccionarGrupo(grupo: any) {
    this.cargarNiveles(grupo.id);
  }

  cargarNiveles(grupoId) {
    this.leccionesService.findAllNivelesByGrupoId(grupoId).subscribe( niveles => {
      this.niveles = niveles;
      this.formSelected = 'niveles';
    });
  }

  onSeleccionarNivel(grupoNivel: any) {
    this.cargarTemas(grupoNivel.id);
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  cargarTemas(grupoNivelId) {
    this.leccionesService.findAllTemasByGrupoNivelId(grupoNivelId).subscribe( temas => {
      this.temas = temas;
      this.formSelected = 'temas';
    });
  }

  volverGrupos() {
    this.formSelected = 'grupos';
  }

  volverNiveles() {
    this.formSelected = 'niveles';
  }

  volverTemas() {
    this.formSelected = 'temas';
  }

  onSeleccionarTema(grupoNivelTemaId) {
    this.cargarLecciones(grupoNivelTemaId.id);
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  cargarLecciones(grupoNivelTemaId) {
    this.leccionesService.findAllLeccionesByGrupoNivelTemaId(grupoNivelTemaId).subscribe( lecciones => {
      this.lecciones = lecciones;
      this.formSelected = 'lecciones';
    });
  }

  onSeleccionarLeccion(leccion) {
    // tslint:disable-next-line: no-unused-expression
    this.router.navigate['/leccion-ejecucion'];
  }
}
