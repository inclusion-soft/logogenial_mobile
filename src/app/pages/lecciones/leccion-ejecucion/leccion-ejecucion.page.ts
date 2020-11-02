import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LeccionesService } from 'src/app/services/lecciones.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ModalController } from '@ionic/angular';
import { RespuestaPreguntaModalPage } from '../../respuesta-pregunta-modal/respuesta-pregunta-modal.page';
import { PreguntaModel } from 'src/app/models/pregunta-model';

@Component({
  selector: 'app-leccion-ejecucion',
  templateUrl: './leccion-ejecucion.page.html',
  styleUrls: ['./leccion-ejecucion.page.scss'],
})
export class LeccionEjecucionPage implements OnInit {
  cantidadPreguntas: number = 0;
  preguntas: PreguntaModel[] = [];
  preguntasPendientes: Observable<any>;
  preguntaActual: any;
  respuestaSeleccionada: any;
  respuestas: Observable<any>;
  leccionId = null;
  puntosPorLeccion = 0;
  porcentaje = 0;
  porcentajeAcumulado = 0;
  posicionPreguntaActual = 0;

  mostrarRespuesta = false;

  constructor(private activatedRoute: ActivatedRoute,
              private leccionesService: LeccionesService,
              private modalCtrl: ModalController ) { }

 ngOnInit() {
   this.leccionId = this.activatedRoute.snapshot.paramMap.get('id');
   this.cargarPreguntas();
 }

 cargarPreguntas() {
  this.leccionesService.findAllPreguntasByLeccionId(this.leccionId).subscribe( (preguntas: any) => {
    this.preguntaActual = preguntas[0];
    this.preguntasPendientes = preguntas;
    this.preguntas = preguntas;
    this.porcentaje = 1 / preguntas.length;
    this.porcentajeAcumulado = this.porcentaje;
    this.puntosPorLeccion = Math.trunc(preguntas[0].leccion.puntos / preguntas.length);
    this.cargarRespuestas(this.preguntas[this.posicionPreguntaActual].id);
  });
 }

 cargarRespuestas(preguntaId: number) {
  this.leccionesService.findAllRespuestasByPreguntaId(preguntaId).subscribe( (respuestas: any) =>{
    respuestas = this.agregarRespuestaConPreguntaSeleccionada(respuestas);
    respuestas = this.desordenarRespuestas(respuestas);
    this.respuestas = respuestas;
  });
 }

 agregarRespuestaConPreguntaSeleccionada(_respuestas:any) {
   const respuestas = _respuestas;
   const respuestaCorrecta = {
     id: this.preguntaActual.respuesta.id,
     fraseRespuesta: this.preguntaActual.fraseRespuesta,
     opcion: this.preguntaActual.respuesta
   };
   let posicionAleatorioa = Math.random() * ( ((respuestas.length + 1) - 0) + 0);
   posicionAleatorioa = Math.trunc(posicionAleatorioa);
   respuestas.splice(posicionAleatorioa, 0, respuestaCorrecta);
   return respuestas;
 }

 desordenarRespuestas(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // Mientras queden elementos a mezclar...
  while (0 !== currentIndex) {
    // Seleccionar un elemento sin mezclar...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // E intercambiarlo con el elemento actual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

 volverSeleccionarLeccion() {

 }

 onSeleccionarRespuesta(itemRespuesta) {
  this.respuestaSeleccionada = itemRespuesta;
 }

 onMostrarRespuesta() {
   this.mostrarRespuesta = true;
 }

 async onResponder() {
  const modal = await this.modalCtrl.create({
    component: RespuestaPreguntaModalPage,
    componentProps: {
      leccionId: this.leccionId,
      pregunta: this.preguntaActual,
      respuesta: this.respuestaSeleccionada,
      puntosPorLeccion:  this.puntosPorLeccion,
      porcentaje: this.porcentajeAcumulado
    }
  });
  await modal.present();
  const { data } = await modal.onWillDismiss();
  if (data.esRespuestaCorrecta) {
    this.porcentajeAcumulado = this.porcentajeAcumulado + this.porcentaje;
    this.posicionPreguntaActual++;
    if(this.posicionPreguntaActual === (this.preguntas.length )){
      alert("fin");
    }else{
      this.preguntaActual = this.preguntas[this.posicionPreguntaActual]
      this.cargarRespuestas(this.preguntas[this.posicionPreguntaActual].id);
    }
  }
 }

}
