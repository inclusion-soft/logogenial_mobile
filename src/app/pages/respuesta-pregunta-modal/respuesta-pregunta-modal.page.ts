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
import { CircleProgressComponent } from 'ng-circle-progress';


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
  @Input() porcentaje: any;
  @ViewChild('circleProgress', {static: true}) circleProgress: CircleProgressComponent;
  //@ViewChild("button", { read: ElementRef, static: true }) button: ElementRef
  esRespuestaCorrecta = false;
  avancePregunta: AvancePreguntaModel = new AvancePreguntaModel();

  optionsA = {
    percent: 85,
    radius: 60,
    showBackground: false,
    outerStrokeWidth: 10,
    innerStrokeWidth: 5,
    subtitleFormat: false,  // clear subtitleFormat coming from other options, because Angular does not assign if variable is undefined. 
    startFromZero: false,
    imageHeight: 50,
    animationDuration: 1000,
    showSubtitle: false
  };

  ngOnInit() {
    this.validarSiRespuestaEsCorrecta();
    this.registrarAvancePregunta();
  }

  ngAfterViewInit(): void {
  }

  validarSiRespuestaEsCorrecta() {
    let preguntaLimpia = this.pregunta.fraseRespuesta.toUpperCase();
    preguntaLimpia = preguntaLimpia.replace(/\s/g, '');

    let respuestaLimpia = this.respuesta.fraseRespuesta.toUpperCase();
    respuestaLimpia = respuestaLimpia.replace(/\s/g, '');

    if (preguntaLimpia === respuestaLimpia) {
      this.esRespuestaCorrecta = true;
      this.optionsA.percent = (this.porcentaje) * 100;
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
    this.modalCtrl.dismiss({
      esRespuestaCorrecta: this.esRespuestaCorrecta
    });
  }

  getUrl() {
    return this.leccionService.getUrlBase();
  }

}
