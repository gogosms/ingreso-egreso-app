import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              public firestore: AngularFirestore) { }

  public initAuthListener() {

    this.auth.authState.subscribe(fireUser => {
      console.log(fireUser);
    });

  }

  public crearUsuario(nombre: string, correo: string, password: string): Promise<void> {
    return this.auth.createUserWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`)
          .set({...newUser});
      });

  }

  public loginUsuario(correo: string, password: string):
    Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  public logout(): Promise<void> {
    return this.auth.signOut();
  }

  public isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(map(fireUser => fireUser !== null));
  }


}
