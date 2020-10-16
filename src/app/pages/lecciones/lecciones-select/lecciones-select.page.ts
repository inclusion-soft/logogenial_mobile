import { Component, OnInit } from '@angular/core';
import { LeccionesService } from 'src/app/services/lecciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LeccionModel } from 'src/app/models/leccion-model';
import { BasicModel } from 'src/app/models/basic-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lecciones-select',
  templateUrl: './lecciones-select.page.html',
  styleUrls: ['./lecciones-select.page.scss'],
})
export class LeccionesSelectPage implements OnInit {
  lecciones: Observable<any>; //LeccionModel[] = [];
  grupos: Observable<any>; // BasicModel[] = [];
  constructor(private leccionesService: LeccionesService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarLecciones();
  }

  cargarLecciones() {
    const informacionUsuario = this.usuarioService.getInformacion();
    this.leccionesService.findAllGroupsByEstudianteId(informacionUsuario.id).subscribe( grupos => {
      this.grupos = grupos;
    });
  }
}
