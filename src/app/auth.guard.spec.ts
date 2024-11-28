import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { of } from 'rxjs';  // Importar 'of' para crear observables

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    // Crear un espía para AuthService
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    // Configuración del TestBed
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],  // Proporcionar el RouterTestingModule para las pruebas
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    // Inyectar los servicios
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('Debe crearse', () => {
    expect(guard).toBeTruthy();
  });

  it('debe permitir la navegación si el usuario ha iniciado sesión', (done) => {
    // Simular que el usuario está logueado
    authService.isLoggedIn.and.returnValue(of(true));

    guard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();  // El guard debería permitir la navegación
      done();
    });
  });

  it('debe redirigir al inicio de sesión si el usuario no ha iniciado sesión', (done) => {
    // Simular que el usuario no está logueado
    authService.isLoggedIn.and.returnValue(of(false));
    spyOn(router, 'navigate');  // Espiar la navegación

    guard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();  // El guard debería bloquear la navegación
      expect(router.navigate).toHaveBeenCalledWith(['/login']);  // El router debería redirigir al login
      done();
    });
  });
});
