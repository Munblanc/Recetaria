import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onRegister() {
    if (this.registerForm.valid) {
      const { nombre, email, password } = this.registerForm.value;

      // Si las contraseñas no coinciden
      if (password !== this.registerForm.value.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }

      this.authService
        .register({ nombre, email, password })
        .then(() => {
          this.navCtrl.navigateRoot('/login');
        })
        .catch((error) => {
          // Manejo de errores
          if (error.code === 'auth/email-already-in-use') {
            this.errorMessage = 'Este correo ya está en uso. Por favor, elige otro.';
          } else {
            this.errorMessage = 'Error en el registro. Intenta nuevamente.';
          }
        });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
    }
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
