import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  create() {
    if (this.registroForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere por favor.',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const { nombre, correo, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then(credentials => {
        Swal.close();
        this.router.navigate(['/']);
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      });

  }

}
