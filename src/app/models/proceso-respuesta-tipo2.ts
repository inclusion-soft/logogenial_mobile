import { PuntoCartesiano } from './punto-cartesiano';

export class ProcesoRespuestaTipo2 {
    cantidadPreguntasRespondidas: number;
    cantidadPreguntasTotales: number;
    cantidadRespuestasCorrectas = 0;
    itemImagenSeleccionado: any;
    itemTextoSeleccionado: any;
    posicionInicial: PuntoCartesiano;
    posicionFinal: PuntoCartesiano;
    constructor() {
        this.itemImagenSeleccionado = null;
        this.itemTextoSeleccionado = null;
        this.cantidadPreguntasRespondidas = 0;
        this.cantidadPreguntasTotales = 0;
    }

    limpiar() {
        this.itemImagenSeleccionado = null;
        this.itemTextoSeleccionado = null;
        this.cantidadPreguntasRespondidas = 0;
        this.cantidadPreguntasTotales = 0;
        this.cantidadRespuestasCorrectas = 0;
        this.posicionInicial = null;
        this.posicionFinal = null;
    }
}
