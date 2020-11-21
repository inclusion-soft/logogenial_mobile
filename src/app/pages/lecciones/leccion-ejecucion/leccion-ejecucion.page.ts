import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LeccionesService } from 'src/app/services/lecciones.service';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { RespuestaPreguntaModalPage } from '../../respuesta-pregunta-modal/respuesta-pregunta-modal.page';
import { PreguntaModel } from 'src/app/models/pregunta-model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProcesoRespuestaTipo2 } from 'src/app/models/proceso-respuesta-tipo2';
import { PuntoCartesiano } from 'src/app/models/punto-cartesiano';

@Component({
  selector: 'app-leccion-ejecucion',
  templateUrl: './leccion-ejecucion.page.html',
  styleUrls: ['./leccion-ejecucion.page.scss'],
})
export class LeccionEjecucionPage implements OnInit
, AfterViewInit 
{
  cantidadPreguntas: number = 0;
  preguntas: PreguntaModel[] = [];
  preguntasPendientes: Observable<any>;
  preguntaActual: any;
  respuestaSeleccionada: any;
  respuestaSeleccionadaTipo2Imagen: any;
  respuestaSeleccionadaTipo2Texto: any;
  respuestas: Observable<any>;
  leccionId = null;
  puntosPorLeccion = 0;
  porcentaje = 0;
  porcentajeAcumulado = 0;
  posicionPreguntaActual = 0;

  mostrarRespuesta = false;
  respuestaCompletada = false;
  procesoRespuestaTipo2 = new ProcesoRespuestaTipo2();
  coloresAsociacionRespuestaTipo2 = ['#278825', '#9F29AF', '#AFAD29', '#D16B29', '#29D1C0', '#5F29D1', '#D12929', '#ABD129', '#2974D1', '#3129D1']

  @ViewChild('imageCanvas', { static: false }) canvas: any;
  canvasElement: any;
  ctx: any;

  @ViewChild('listImagenes', {static: false}) listaImagenes: any;

  constructor(private activatedRoute: ActivatedRoute,
              private leccionesService: LeccionesService,
              private modalCtrl: ModalController,
              private navCtrl: NavController,
              private usuarioService: UsuarioService,
              private plt: Platform 
              ) { }

 ngOnInit() {
   this.leccionId = this.activatedRoute.snapshot.paramMap.get('id');
   this.cargarPreguntas();
 }

 ngAfterViewInit() {
  // this.canvasElement = this.canvas.nativeElement;
  // this.canvasElement.width = this.plt.width() + '';
  //  this.canvasElement.height = 200;
  setTimeout( this.inicializarObjetoDibujo, 500, this);
 }

 inicializarObjetoDibujo(_this) {
  _this.canvasElement = _this.canvas.nativeElement;
  _this.canvasElement.height = _this.listaImagenes.el.offsetHeight;
  this.ctx = _this.canvasElement.getContext('2d');

  //this.ctx = this.canvasElement.getContext('2d');
  // this.ctx.beginPath();
  // this.ctx.moveTo(0, 0);
  // this.ctx.strokeStyle = this.coloresAsociacionRespuestaTipo2[5];
  // this.ctx.lineTo(100, 0);
  // this.ctx.lineWidth = 5;
  // this.ctx.stroke();

  // this.ctx.beginPath();
  // this.ctx.moveTo(0, 100);
  // this.ctx.strokeStyle = this.coloresAsociacionRespuestaTipo2[6];
  // this.ctx.lineTo(100, 100);
  // this.ctx.lineWidth = 5;
  // this.ctx.stroke();

  // this.ctx.beginPath();
  // this.ctx.moveTo(0, 300);
  // this.ctx.strokeStyle = this.coloresAsociacionRespuestaTipo2[6];
  // this.ctx.lineTo(100, 100);
  // this.ctx.lineWidth = 5;
  // this.ctx.stroke();

 }

 cargarPreguntas() {
  this.leccionesService.findAllPreguntasByLeccionId(this.leccionId).subscribe( (preguntas: any) => {
    this.preguntaActual = preguntas[0];
    if (this.preguntaActual.tipopregunta === 2 ){
      // this.procesoRespuestaTipo2.cantidadPreguntasTotales = this.preguntaActual.
      //this.cargarPreguntaTipo2();
      this.procesoRespuestaTipo2.limpiar();
      this.procesoRespuestaTipo2.cantidadPreguntasTotales = this.preguntaActual.respuesta.length;
    }
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

 async volverSeleccionarLeccion() {
  const ultimoAvance = {
    formulario: 'leccion',
    valor: 0
  };
  const statusSave = await this.usuarioService.guardarLlaveValor('ultimoAvance', JSON.stringify(ultimoAvance));
  this.navCtrl.navigateRoot( '/lecciones-select', { animated: true } );
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
    if (this.posicionPreguntaActual === (this.preguntas.length )) {
      const ultimoAvance = {
        formulario: 'leccion',
        valor: this.leccionId
      };
      const statusSave = await this.usuarioService.guardarLlaveValor('ultimoAvance', JSON.stringify(ultimoAvance));
      this.navCtrl.navigateRoot( '/lecciones-select', { animated: true } );
    } else {
      this.preguntaActual = this.preguntas[this.posicionPreguntaActual];
      this.cargarRespuestas(this.preguntas[this.posicionPreguntaActual].id);
    }
    if (this.preguntaActual.tipoPregunta === 2 ){
      //this.cargarPreguntaTipo2();
    }
  }
 }


 onSeleccionarRespuestaTipo2SeccionImagenes(itemRespuesta) {
  this.respuestaSeleccionadaTipo2Imagen = itemRespuesta;
  this.procesoRespuestaTipo2.itemImagenSeleccionado = itemRespuesta;
 }

 onSeleccionarRespuestaTipo2SeccionTexto(itemRespuesta) {
  this.respuestaSeleccionadaTipo2Texto = itemRespuesta;
  this.procesoRespuestaTipo2.itemTextoSeleccionado = itemRespuesta;
 }

 dibujarLineaRespuesta(posicionInicial: PuntoCartesiano, posicionFinal: PuntoCartesiano, color: string) {
  this.ctx = this.canvasElement.getContext('2d');
  this.ctx.beginPath();
  this.ctx.moveTo(posicionInicial.x, posicionInicial.y);
  this.ctx.strokeStyle = color;
  this.ctx.lineTo(posicionFinal.x, posicionFinal.y);
  this.ctx.lineWidth = 5;
  this.ctx.stroke();
 }

 analizarCoordenadaSeleccionada(event){
   const constanteTraslacion = -160;
  //  if(event.clientX < 225) {
  //    this.procesoRespuestaTipo2.posicionInicial = { x: 155, y: event.clientY};
  //  } else{
  //   this.procesoRespuestaTipo2.posicionFinal = { x: event.clientX - 155, y: event.clientY - 100};
  //  }
   if(event.clientX < 225) {
    this.procesoRespuestaTipo2.posicionInicial = { x: 0, y: event.clientY + constanteTraslacion};
  } else{
   this.procesoRespuestaTipo2.posicionFinal = { x: 70, y: event.clientY + constanteTraslacion};
  }
   console.log( event.clientX +  ', ' + event.clientY);
}

analizarCoordenadaCanvas(event){
  console.log( ' canvas:           ' + event.clientX +  ', ' + event.clientY);
}

  onAsociarRespuestaTipo2() {
    if(this.procesoRespuestaTipo2.posicionInicial !== null && this.procesoRespuestaTipo2.posicionFinal !== null) {
      const cantidadRespuestaActual = this.procesoRespuestaTipo2.cantidadPreguntasRespondidas;
      this.dibujarLineaRespuesta(this.procesoRespuestaTipo2.posicionInicial, this.procesoRespuestaTipo2.posicionFinal, this.coloresAsociacionRespuestaTipo2[cantidadRespuestaActual])
      this.procesoRespuestaTipo2.cantidadPreguntasRespondidas ++;
    }
  }

}
