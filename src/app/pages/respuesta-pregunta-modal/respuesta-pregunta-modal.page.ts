import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeccionesService } from 'src/app/services/lecciones.service';

@Component({
  selector: 'app-respuesta-pregunta-modal',
  templateUrl: './respuesta-pregunta-modal.page.html',
  styleUrls: ['./respuesta-pregunta-modal.page.scss'],
})
export class RespuestaPreguntaModalPage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private leccionService: LeccionesService) { }

  @Input() leccionId: any;
  @Input() pregunta: any;
  @Input() respuesta: any;
  esRespuestaCorrecta = false;

  ngOnInit() {
    this.validarSiRespuestaEsCorrecta();
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

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  getUrl() {
    return this.leccionService.getUrlBase();
  }

}
