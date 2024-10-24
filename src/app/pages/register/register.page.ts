import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(8), this.containsNumber]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordsMatch }); 
  }

  containsNumber(control: any) {
    const hasNumber = /\d/.test(control.value); 
    return hasNumber ? null : { noNumber: true };  
  }

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { nombre, email, password } = this.registerForm.value;
      this.authService.register({ nombre, email, password })
        .then(result => {
          console.log('Usuario registrado', result);
          this.errorMessage = '';
          
          // Redirigir al usuario a la página de login después de un registro exitoso
          this.router.navigate(['/login']);
        })
        .catch(error => {
          console.error('Error al registrar', error);
          if (error.code === 'auth/email-already-in-use') {
            this.errorMessage = 'Este correo ya está en uso. Por favor, elige otro.';
          } else {
            this.errorMessage = 'Ocurrió un error al registrarte. Intenta nuevamente.';
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
