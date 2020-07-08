import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as Ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  uiSubscription: Subscription;
  loading  = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) {

    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
    .subscribe(ui => this.loading = ui.isLoading);
  }

  create() {
    if (this.registroForm.invalid) {
      return;
    }

    this.store.dispatch(Ui.isLoading());

    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(credentials => {
        this.store.dispatch(Ui.stopLoading());
        this.router.navigate(['/']);
      }).catch(error => {
        this.store.dispatch(Ui.stopLoading());
      });

  }

}
