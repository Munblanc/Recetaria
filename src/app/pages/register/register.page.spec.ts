import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authService: jasmine.SpyObj<AuthService>;
  let navCtrl: jasmine.SpyObj<NavController>;

  beforeEach(() => {
    // Crear un espía para AuthService y NavController
    authService = jasmine.createSpyObj('AuthService', ['register']);
    navCtrl = jasmine.createSpyObj('NavController', ['navigateRoot', 'navigateBack']);

    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authService },
        { provide: NavController, useValue: navCtrl },
        { provide: Router, useValue: {} },  // Puedes añadir un espía de Router si es necesario
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debe llamar a AuthService.register en el formulario válido enviar', fakeAsync(() => {
    // Configurar el formulario con datos válidos
    component.registerForm.setValue({
      nombre: 'Test User',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456'
    });

    // Simular que AuthService.register resuelve correctamente
    authService.register.and.returnValue(Promise.resolve());

    // Llamar al método onRegister
    component.onRegister();
    tick(); // Avanza el tiempo para que las promesas se resuelvan

    expect(authService.register).toHaveBeenCalledWith({
      nombre: 'Test User',
      email: 'test@example.com',
      password: '123456'
    });
    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/login');
    expect(component.errorMessage).toBe('');
  }));

  it('Debería mostrar un mensaje de error si se produce un error en el servicio de autenticación', fakeAsync(() => {
    // Configurar el formulario con datos válidos
    component.registerForm.setValue({
      nombre: 'Test User',
      email: 'test@example.com',
      password: '123456',
      confirmPassword: '123456'
    });

    // Simular un error en AuthService.register
    authService.register.and.returnValue(Promise.reject({ code: 'auth/email-already-in-use' }));

    // Llamar al método onRegister
    component.onRegister();
    tick(); // Avanza el tiempo para que las promesas se resuelvan

    expect(authService.register).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Este correo ya está en uso. Por favor, elige otro.');
  }));

  it('Debería mostrar un mensaje de error para un formulario no válido', () => {
    // Configurar un formulario con datos inválidos (por ejemplo, sin llenar los campos)
    component.registerForm.setValue({
      nombre: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    component.onRegister();

    expect(component.errorMessage).toBe('Por favor, completa todos los campos requeridos.');
  });

  it('Debe navegar a la página de inicio de sesión cuando se llama a goToLogin', () => {
    component.goToLogin();
    expect(navCtrl.navigateBack).toHaveBeenCalledWith('/login');
  });
});
