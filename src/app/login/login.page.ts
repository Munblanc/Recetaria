import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  onLogin() {
    if (this.authService.login(this.email, this.password)) {
      this.navCtrl.navigateForward('/home');
    } else {
      alert('Credenciales incorrectas');
    }
  }

  continueWithGoogle() {
    // Lógica para continuar con Google
  }

  continueWithApple() {
    // Lógica para continuar con Apple
  }
  
  navToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}