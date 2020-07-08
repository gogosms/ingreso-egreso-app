

export class Usuario {

  // tslint:disable-next-line: typedef
  public static fromFireBase({correo, uid, nombre}) {
    return new Usuario(uid, nombre, correo);
  }

  constructor(public uid: string,
              public nombre: string,
              public correo: string) {

    }


}
