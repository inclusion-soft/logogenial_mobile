export class UsuarioModel  {
    id!: number;
    nombre!: string;
    apellido!: string;
    username!: string;
    email!: string;
    password!: string;
    repetirPassword!: string;
    avatar!: string;
    rol: string;
    roles: any[];
  }
