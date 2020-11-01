import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Injectable } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { LeccionesService } from 'src/app/services/lecciones.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AvancePreguntaModel } from 'src/app/models/avance-pregunta-model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiService } from 'src/app/services/ui.service';
import { TipoAvance } from 'src/app/models/tipo-avance.enum';
import { Resultado } from 'src/app/models/resultado.enum';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-respuesta-pregunta-modal',
  templateUrl: './respuesta-pregunta-modal.page.html',
  styleUrls: ['./respuesta-pregunta-modal.page.scss'],
})
export class RespuestaPreguntaModalPage implements OnInit, AfterViewInit {
  constructor(private modalCtrl: ModalController,
              private leccionService: LeccionesService,
              private dashboardService: DashboardService,
              private usuarioService: UsuarioService,
              private uiService: UiService,
              private animationCtrl: AnimationController) { }

  @Input() leccionId: any;
  @Input() pregunta: any;
  @Input() respuesta: any;
  @Input() puntosPorLeccion: any;

  @ViewChild("button", { read: ElementRef, static: true }) button: ElementRef
  esRespuestaCorrecta = false;
  avancePregunta: AvancePreguntaModel = new AvancePreguntaModel();
  ngOnInit() {
    this.validarSiRespuestaEsCorrecta();
    this.registrarAvancePregunta();
  }

  ngAfterViewInit(): void {
  }

  public animateButton() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.button.nativeElement)
      .duration(1000)
      .iterations(Infinity)
      .fromTo("--background", "green", "blue")
    animation.play();
  }

  validarSiRespuestaEsCorrecta() {
    let preguntaLimpia = this.pregunta.respuesta.frase.toUpperCase();
    preguntaLimpia = preguntaLimpia.replace(/\s/g, '');

    let respuestaLimpia = this.respuesta.opcion.nombre.toUpperCase();
    respuestaLimpia = respuestaLimpia.replace(/\s/g, '');

    if (preguntaLimpia === respuestaLimpia) {
      this.esRespuestaCorrecta = true;
    } else {
      this.esRespuestaCorrecta = false;
    }
  }

  async registrarAvancePregunta() {
    const informacion = await this.usuarioService.getInformacionPromise();
    const userInfo = informacion as any;
    this.avancePregunta.estudiante.id = userInfo.id;
    this.avancePregunta.pregunta.id = this.pregunta.id;
    if (this.esRespuestaCorrecta === true) {
      this.avancePregunta.resultado = Resultado.Correcto;
      this.avancePregunta.tipoAvance = TipoAvance.Leccion;
      this.avancePregunta.puntaje = this.puntosPorLeccion;
    } else {
      this.avancePregunta.respuesta.id = this.respuesta.id;
      this.avancePregunta.resultado = Resultado.Incorrecto;
      this.avancePregunta.tipoAvance = TipoAvance.Practica;
    }
    this.dashboardService.createAvancePregunta(this.avancePregunta).subscribe( resultado => {}, err => {
      this.uiService.alertaInformativa('No fue posible registrar el resultado');
    });
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  getUrl() {
    return this.leccionService.getUrlBase();
  }

}
