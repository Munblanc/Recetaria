import { Injectable } from '@angular/core';
import { of } from 'rxjs'; // Utiliza 'of' para devolver observables con valores fijos

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  getRecipeResponse(message: string) {
    // Respuestas predefinidas basadas en el mensaje
    const responses: { [key: string]: string } = {
      "Hola": "¡Hola!, ¿En qué puedo ayudarte?",
      "Dame los ingredientes para hacer un pastel de chocolate": "¡Por supuesto!, Los ingredientes son: 200g de chocolate, 200g de azúcar, 200g de mantequilla, 4 huevos, 100g de harina.",
      "Dime las instrucciones": "Las instrucciones son: Precalentar el horno a 180°C (350°F), Derretir el chocolate con la mantequilla, luego batir los huevos con el azúcar, después añadir el chocolate derretido, incorporar la harina y mezclar bien y finalmente hornear durante 25-30 minutos. Recuerda dejarlo enfriar antes de desmoldar y servir.",
      "¿Cómo se hace una ensalada César?": "Ingredientes: lechuga, croutons, queso parmesano, aderezo César. Mezcla todos los ingredientes y sirve.",
      "Quiero saber cómo hacer galletas de avena": "Ingredientes: 100g de avena, 50g de azúcar, 50g de mantequilla, 1 huevo. Mezcla y hornea a 180°C por 15 minutos.",
      "Recomiéndame una receta rápida para la cena": "Prueba con una ensalada de pollo: mezcla pollo asado, lechuga, tomates y aderezo.",
      "¿Cuáles son los ingredientes principales para una lasaña?": "Ingredientes: carne molida, pasta de lasaña, queso ricotta, salsa de tomate, queso mozzarella."
    };

    // Retorna la respuesta predefinida o un mensaje por defecto si no hay coincidencia
    const response = responses[message] || "Lo siento, no tengo una respuesta para eso.";
    return of(response); // Envía la respuesta como un Observable
  }
}

