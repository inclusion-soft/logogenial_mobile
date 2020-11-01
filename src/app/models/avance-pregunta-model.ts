import { BasicModel } from './basic-model';

export class AvancePreguntaModel {
    id = 0;
    tipoAvance!: number;
    resultado!: number;
    fechaCreacion!: Date;
    activo!: boolean;
    estudiante!: BasicModel;
    pregunta!: BasicModel;
    respuesta!: BasicModel;
    puntaje!: number;
    constructor() {
      this.estudiante = new BasicModel();
      this.pregunta = new BasicModel();
      this.respuesta = new BasicModel();
      this.activo = true;
      this.puntaje = 0;
    }
  }
