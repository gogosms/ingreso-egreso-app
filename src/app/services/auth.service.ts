import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from '../modelos/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as AuthActions from '../auth/auth.actions';
import * as IngresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  userSuscription: Subscription;
  private _user: Usuario;

  get user() {
    return this._user;
  }

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  public initAuthListener() {

    this.auth.authState.subscribe(fireUser => {
      if (fireUser) {
        this.userSuscription = this.firestore.doc(`${fireUser.uid}/usuario`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.fromFireBase(firestoreUser);
            this._user = user;
            this.store.dispatch(AuthActions.setUser({ user }));
          });
      } else {
        this._user = null;
        this.userSuscription?.unsubscribe();
        this.store.dispatch(AuthActions.unSetUser());
        this.store.dispatch(IngresoEgresoActions.unSetItems());
      }

    });

  }

  public crearUsuario(nombre: string, correo: string, password: string): Promise<void> {
    return this.auth.createUserWithEmailAndPassword(correo, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firestore.doc(`${user.uid}/usuario`)
          .set({ ...newUser });
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
