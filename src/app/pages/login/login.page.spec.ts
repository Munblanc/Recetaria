import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

// Importar Firebase y AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Inicializar Firebase en el entorno de pruebas
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyBbrSHxu7kbEsx5S3a_7-u8t04PUa3RdrQ",
          authDomain: "recetaria-2024.firebaseapp.com",
          databaseURL: "https://recetaria-2024-default-rtdb.firebaseio.com",
          projectId: "recetaria-2024",
          storageBucket: "recetaria-2024.appspot.com",
          messagingSenderId: "439253985358",
          appId: "1:439253985358:web:7bbe51e89835eed04fbb1f"
        }),
      ],
      declarations: [LoginPage],
      providers: [AngularFireAuth], // Proveer el servicio AngularFireAuth
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
