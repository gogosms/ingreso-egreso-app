import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as Ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loading  = false;
  loginForm: FormGroup;
  uiSubscription: Subscription;
  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) {
    this.loginForm = this.builder.group({
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

  login() {

    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(Ui.isLoading());
    const { correo, password } = this.loginForm.value;
    this.authService.loginUsuario(correo, password).then(credentials => {
      this.store.dispatch(Ui.stopLoading());
      this.router.navigate(['/']);
    }).catch(error => {
      this.store.dispatch(Ui.stopLoading());
    });
  }

}
