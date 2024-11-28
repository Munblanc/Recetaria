import { TestBed } from '@angular/core/testing';
import { OpenaiService } from './openai.service';
import { OpenAI } from 'openai';

// Creamos un espía (spy) para el servicio OpenAI
describe('OpenaiService', () => {
  let service: OpenaiService;
  let openaiSpy: jasmine.SpyObj<OpenAI>;

  beforeEach(() => {
    // Creamos un espía para OpenAI
    const spy = jasmine.createSpyObj('OpenAI', ['chat']);

    // Configuración del TestBed
    TestBed.configureTestingModule({
      providers: [
        OpenaiService,
        { provide: OpenAI, useValue: spy },
      ],
    });

    service = TestBed.inject(OpenaiService);
    openaiSpy = TestBed.inject(OpenAI) as jasmine.SpyObj<OpenAI>;
  });

  it('Debe crearse', () => {
    expect(service).toBeTruthy();
  });

  it('Debe llamar a la API de OpenAI con los parámetros correctos cuando se quiere obtener receta', async () => {
    // Simulamos una respuesta exitosa
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Deliciosa pizza con tomates y queso!'
          }
        }
      ]
    };
  
    // Creamos un espía adecuado para chat.completions.create
    const mockCreate = jasmine.createSpy('create').and.returnValue(Promise.resolve(mockResponse));
    const mockChat = { completions: { create: mockCreate } };
    
    // Creamos un espía para OpenAI y le asignamos el espía de chat
    const openaiSpy = jasmine.createSpyObj('OpenAI', ['chat']);
    openaiSpy.chat = mockChat;
  
    // Creamos el servicio OpenaiService con el espía
    const openaiService = new OpenaiService();
    
    // Sobreescribimos la propiedad 'openai' en el servicio para usar el espía
    openaiService['openai'] = openaiSpy;
  
    const ingredients = 'tomates, queso';
    const result = await openaiService.getRecipe(ingredients);
  
    // Verificamos que se haya llamado a la API con los parámetros correctos
    expect(mockCreate).toHaveBeenCalledWith({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Eres un experto chef profesional, saluda y genera solo una receta clara solo con los ingredientes entregados, especifíca los gramos y ml.'
 },
        { role: 'user', content: `Crea recetas usando estos ingredientes: ${ingredients}` }
      ]
    });
  
    // Verificamos que el resultado sea el esperado
    expect(result).toBe('Deliciosa pizza con tomates y queso!');
  });
  
  
  
});
