import { BasicModel } from './basic-model';

export class PreguntaModel {
    id = 0;
  descripcion!: string;
  enumeracion!: number;
  tipopregunta!: number;
  aprobacion!: boolean;
  usocompartido!: boolean;
  usuario!: BasicModel;
  activo!: boolean;
  leccion!: BasicModel;
  respuesta!: any;
  constructor() {
    this.leccion = new BasicModel();
    this.usuario = new BasicModel();
    this.usuario.id = 1;
    //this.respuesta = new DatageniaModel();
    this.aprobacion = false;
    this.usocompartido = true;
    this.activo = true;
  }
}
