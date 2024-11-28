import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { of } from 'rxjs';

// Falsa configuración de Firebase (sólo para pruebas)
const firebaseConfig = {
  apiKey: 'fake-api-key',
  authDomain: 'fake-auth-domain',
  projectId: 'fake-project-id',
  storageBucket: 'fake-storage-bucket',
  messagingSenderId: 'fake-messaging-sender-id',
  appId: 'fake-app-id',
  measurementId: 'fake-measurement-id'
};

describe('AuthService', () => {
  let service: AuthService;
  let afAuth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    // Creamos un mock del servicio AngularFireAuth
    afAuth = jasmine.createSpyObj('AngularFireAuth', ['signOut', 'authState', 'currentUser']);

    // Configuramos TestBed
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(firebaseConfig)  // Inicializa Firebase con la configuración falsa
      ],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: afAuth }  // Usamos el mock aquí
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
