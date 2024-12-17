import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Método de registro corregido
  register(data: { nombre: string; email: string; password: string }): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          return user
            .updateProfile({
              displayName: data.nombre, // Asegúrate de que el nombre se guarda correctamente
            })
            .then(() => {
              return {
                uid: user.uid,
                email: user.email,
                nombre: data.nombre, // Almacenar nombre en el objeto retornado
              };
            })
            .catch((error) => {
              console.error('Error al actualizar el perfil del usuario', error);
              throw error; // Lanzar el error en caso de que ocurra un fallo al actualizar el perfil
            });
        } else {
          // Si no se obtiene un usuario
          throw new Error('No se pudo obtener el usuario después del registro.');
        }
      })
      .catch((error) => {
        console.error('Error al registrar al usuario:', error);
        throw error; // Lanzar el error si la creación de la cuenta falla
      });
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('Usuario logueado', result);
        this.router.navigate(['/tabs/home']);
        return result;
      })
      .catch((error) => {
        console.log('Error al loguear', error);
        throw error;
      });
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user: firebase.User | null) => !!user));
  }

  getCurrentUser(): Promise<any> {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        return {
          uid: user.uid,
          nombre: user.displayName || 'Sin nombre', // Verifica que el nombre esté disponible
        };
      }
      return null;
    });
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Email de recuperación enviado');
      })
      .catch((error) => {
        console.log('Error al enviar email de recuperación', error);
      });
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      console.log('Sesión cerrada');
      this.router.navigate(['/login']);  // Redirige al login
    }).catch(err => {
      console.error('Error al cerrar sesión', err);
    });
  }

  isAdminUser(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user: firebase.User | null) => {
        return user?.email === 'admin@admin.com';
      })
    );
  }
}
