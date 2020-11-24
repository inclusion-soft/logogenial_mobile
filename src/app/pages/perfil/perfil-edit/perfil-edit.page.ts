import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiService } from 'src/app/services/ui.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.page.html',
  styleUrls: ['./perfil-edit.page.scss'],
})
export class PerfilEditPage implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiService
    ) { }

  usuario: UsuarioModel;

  ngOnInit() {
    this.usuarioService.userDetail$.subscribe( (usuario: UsuarioModel) => {
      this.usuario = usuario;
    }, err => {alert('error'); });
  }

  submitRegistro(fRegistro: NgForm ): void {
    if ( fRegistro.valid ) {
        this.usuarioService.update(this.usuario).subscribe( (r: any) => {
            this.uiService.alertaInformativa('Datos guardados correctamente.');
        }, err => {
            if ( err.status === 404 ) {
              this.uiService.alertaInformativa('No se encontró el registro.');
            } else {
              this.uiService.alertaInformativa('Se presentó un erro. Favor comuniquese con el administrador.');
            }
        });
    }
  }

}
