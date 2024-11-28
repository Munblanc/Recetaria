import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

// Mock para Router
class MockRouter {
  navigate(path: string[]) {
    console.log('Redirigiendo a: ', path);
  }
}

describe('AuthService - resetPassword', () => {
  let service: AuthService;
  let afAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockRouter: MockRouter;

  beforeEach(() => {
    // Creamos un mock del servicio AngularFireAuth
    afAuth = jasmine.createSpyObj('AngularFireAuth', ['sendPasswordResetEmail', 'signOut']);
    
    // Creamos el mock del Router
    mockRouter = new MockRouter();

    // Configuramos TestBed
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: afAuth },  // Usamos el mock de AngularFireAuth
        { provide: Router, useValue: mockRouter },        // Usamos el mock del Router
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('Debe enviar un correo electrónico de restablecimiento de contraseña', async () => {
    const email = 'test@example.com';
    
    // Simulamos que `sendPasswordResetEmail` se resuelve correctamente
    afAuth.sendPasswordResetEmail.and.returnValue(Promise.resolve());

    // Ejecutamos el método resetPassword
    await service.resetPassword(email);

    // Verificamos que `sendPasswordResetEmail` haya sido llamado con el email correcto
    expect(afAuth.sendPasswordResetEmail).toHaveBeenCalledWith(email);
  });

  it('Debe manejar el error si se produce un inconveniente al enviar correo electrónico de restablecimiento de contraseña', async () => {
    const email = 'test@example.com';
    
    // Simulamos que `sendPasswordResetEmail` falla
    afAuth.sendPasswordResetEmail.and.returnValue(Promise.reject('Error sending email'));

    try {
      // Ejecutamos el método resetPassword y esperamos que lance un error
      await service.resetPassword(email);
    } catch (error) {
      // Verificamos que el error sea el esperado
      expect(error).toBe('Error sending email');
    }
  });

  // Aquí agregamos la prueba unitaria para el método logout
  it('Debe cerrar sesión y redirigir al login', async () => {
    // Spying en la función `navigate` para verificar que la redirección ocurre
    spyOn(mockRouter, 'navigate');

    // Simulamos que `signOut` se resuelve correctamente
    afAuth.signOut.and.returnValue(Promise.resolve());

    // Ejecutamos el método logout
    await service.logout();

    // Verificamos que se haya llamado a `signOut`
    expect(afAuth.signOut).toHaveBeenCalled();

    // Verificamos que después de cerrar sesión se redirija al login
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
