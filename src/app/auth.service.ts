import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import firebase from 'firebase/compat/app'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}


  register(data: { nombre: string; email: string; password: string }): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user?.updateProfile({
          displayName: data.nombre // Actualiza el nombre en el perfil
        }).then(() => {
          return {
            uid: user.uid,
            email: user.email,
            nombre: data.nombre
          };
        });
      })
      .catch((error) => {
        throw error; 
      });
}

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
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
  

logout(): Promise<any> {
  return this.afAuth.signOut()
  .then(() => {
    console.log('Usuario deslogueado');
    this.router.navigate(['/login']);
  })
  .catch((error) => {
    console.log('Error al desloguear', error);
  });
}

isLoggedIn(): Observable<boolean> {
  return this.afAuth.authState.pipe(
    map((user: firebase.User | null) => !!user));
}
getCurrentUser(): Promise<any> {
  return this.afAuth.currentUser;
}


resetPassword(email: string): Promise<void> {
  return this.afAuth.sendPasswordResetEmail(email)
  .then(() => {
    console.log('Email de recuperación enviado');
  })
  .catch((error) => {
    console.log('Error al enviar email de recuperación', error);
  });
}


}

