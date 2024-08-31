import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service'; // Asegúrate de tener el servicio de autenticación

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  private isValidEmail(email: string): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onRegister() {
    if (!this.isValidEmail(this.email)) {
      alert('El correo electrónico no es válido');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.authService.register(this.email, this.password)) {
      this.navCtrl.navigateForward('/login');
    } else {
      alert('Error al registrar el usuario');
    }
  }

  // Función para volver al login
  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
