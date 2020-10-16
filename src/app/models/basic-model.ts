export class BasicModel {
    id = 0;
    nombre!: string;
    enumeracion: number;
    anio!: string;
    activo!: boolean;
    //usuario!: UsuarioModel;
    public constructor() {
      this.activo = true;
    }
  }
