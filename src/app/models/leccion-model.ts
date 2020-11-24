import { BasicModel } from './basic-model';

export class LeccionModel {
    id = 0;
    leyenda!: string;
    enumeracion!: number;
    activo!: boolean;
    grupoNivelTema!: BasicModel;
    constructor() {
      this.grupoNivelTema = new BasicModel();
      this.activo = true;
    }
  }
