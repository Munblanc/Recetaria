import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  loginForm!: FormGroup; 
  showGeneralError = false;
  feedbackMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController 
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.showGeneralError = true;
      console.error('Formulario inválido');
      return; 
    }
    
    const { email, password } = this.loginForm.value;

    // Llamar al servicio de autenticación
    this.authService.login(email, password)
      .then((result) => {
        console.log('login exitoso', result);
        this.navCtrl.navigateForward('/tabs/home');
        this.showGeneralError = false; 
      })
      .catch(error => {
        console.error('Error de login', error);
        this.showGeneralError = true;
      });
  }

  continueWithGoogle() {
    const provider = new GoogleAuthProvider(); // Crea un nuevo proveedor de Google
    const auth = getAuth(); // Obtiene la instancia de autenticación
  
    signInWithPopup(auth, provider) // Inicia sesión con el popup de Google
      .then((result) => {
        console.log('Usuario autenticado: ', result.user); // Muestra el usuario autenticado en consola
        this.navCtrl.navigateForward('/tabs/home'); // Redirige a la página de inicio
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google: ', error); // Maneja cualquier error
        this.showGeneralError = true; // Muestra un mensaje de error general si es necesario
      });
  }


  resetPassword() {
    const email = this.loginForm.get('email')?.value; // Obtiene el correo electrónico del formulario
    if (email) {
      const auth = getAuth(); // Obtiene la instancia de autenticación
      sendPasswordResetEmail(auth, email)
        .then(() => {
          this.feedbackMessage = 'Correo de restablecimiento enviado. Revisa tu bandeja de entrada.';
          this.autoDismissFeedback(); // Llama a la función para ocultar el mensaje después de un tiempo
        })
        .catch((error) => {
          this.feedbackMessage = 'Error al enviar el correo de restablecimiento. Intenta nuevamente.';
          console.error('Error al enviar el correo de restablecimiento', error);
        });
    } else {
      this.feedbackMessage = 'Por favor, ingresa tu correo electrónico para restablecer tu contraseña.';
      console.error('Por favor, ingresa tu correo electrónico')
      this.autoDismissFeedback();;
    }
  }

  // Función para ocultar el mensaje después de 5 segundos
  autoDismissFeedback() {
    setTimeout(() => {
      this.feedbackMessage = null;
    }, 5000); // 5000 ms = 5 segundos
  }



  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
