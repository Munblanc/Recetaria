import { TestBed } from '@angular/core/testing';
import { OpenaiPage } from './openai.page';
import { AuthService } from '../../auth.service';
import { OpenaiService } from 'src/app/services/openai.service';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { InjectionToken } from '@angular/core';

describe('OpenaiPage', () => {
  let component: OpenaiPage;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let openaiServiceSpy: jasmine.SpyObj<OpenaiService>;

  beforeEach(async () => {
    // Mock para AngularFireAuth
    const angularFireAuthMock = {
      authState: jasmine.createSpy('authState').and.returnValue(Promise.resolve(null)),
    };

    // Mock para el AuthService
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    authServiceMock.getCurrentUser.and.returnValue(Promise.resolve({ uid: '123', nombre: 'Test User' }));

    // Mock para el OpenaiService
    const openaiServiceMock = jasmine.createSpyObj('OpenaiService', ['getRecipe', 'saveRecipeToFirebase']);
    openaiServiceMock.getRecipe.and.returnValue(Promise.resolve('Mocked Recipe'));

    await TestBed.configureTestingModule({
      declarations: [OpenaiPage],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: OpenaiService, useValue: openaiServiceMock },
        { provide: AngularFireAuth, useValue: angularFireAuthMock },
        { provide: new InjectionToken('angularfire2.app.options'), useValue: {} }, // Provisión para Firebase options
        AlertController,
      ],
    }).compileComponents();

    // Crear instancia del componente
    const fixture = TestBed.createComponent(OpenaiPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Al llamar a getRecipe, se debe invocar en el servicio de openai para obtener la receta', async () => {
    component.ingredients = 'tomate, queso';
    await component.getRecipes();
    expect(component.recipe).toBe('Mocked Recipe');
  });

});
