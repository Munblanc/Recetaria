import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;  // Definición del formulario
  showGeneralError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Inicialización del formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.showGeneralError = true; // Mostrar mensaje de error si el formulario no es válido
      console.error('Formulario inválido');
      return; // Salir del método si el formulario no es válido
    }
    
    const { email, password } = this.loginForm.value;
  
    // Llamar al servicio de autenticación
    this.authService.login(email, password)
      .then((result) => {
        console.log('login exitoso', result);
        this.navCtrl.navigateForward('/tabs/home');
        this.showGeneralError = false; // Limpiar mensaje de error al realizar el login
      })
      .catch(error => {
        console.error('Error de login', error);
        this.showGeneralError = true; // Mostrar mensaje de error en caso de fallo en el login
        // Aquí puedes agregar lógica adicional para mostrar un mensaje de error específico
      });
  }
  
  
  

  continueWithGoogle() {
    // Lógica para login con Google
  }

  continueWithApple() {
    // Lógica para login con Apple
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
