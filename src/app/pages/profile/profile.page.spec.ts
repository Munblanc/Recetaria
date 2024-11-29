import { ComponentFixture, TestBed} from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { of } from 'rxjs';
// Importar Firebase y AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';  // Importar ModalController

// Mock de ModalController
class MockModalController {
  create() {
    return Promise.resolve({
      present: jasmine.createSpy('present'),
      dismiss: jasmine.createSpy('dismiss')
    });
  }
}

// Mock de AngularFireAuth
class MockAngularFireAuth {
  authState = of({ uid: 'test-uid', email: 'test@example.com' });
  currentUser = Promise.resolve({ uid: 'test-uid', email: 'test@example.com' });

  signOut() {
    return Promise.resolve();
  }
}

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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
      declarations: [ProfilePage],
      providers: [
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: ModalController, useClass: MockModalController }  // Proveer el MockModalController
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
