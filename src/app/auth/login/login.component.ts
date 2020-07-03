import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.builder.group({
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {

  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere por favor.',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    Swal.showLoading();
    const { correo, password } = this.loginForm.value;
    this.authService.loginUsuario(correo, password).then(credentials => {
      Swal.close();
      this.router.navigate(['/']);
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
      console.error(error);
    });
  }

}
