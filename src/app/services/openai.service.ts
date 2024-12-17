import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { getDatabase, ref, set, push } from 'firebase/database';
import { initializeApp, getApps } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private openai: OpenAI;
  private apiKey: string = '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';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBbrSHxu7kbEsx5S3a_7-u8t04PUa3RdrQ',
      authDomain: 'recetaria-2024.firebaseapp.com',
      databaseURL: 'https://recetaria-2024-default-rtdb.firebaseio.com',
      projectId: 'recetaria-2024',
      storageBucket: 'recetaria-2024.appspot.com',
      messagingSenderId: '439253985358',
      appId: '1:439253985358:web:7bbe51e89835eed04fbb1f',
    };

    if (getApps().length === 0) {
      initializeApp(firebaseConfig);
    }

    this.openai = new OpenAI({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  async getRecipe(ingredients: string): Promise<string> {
    const prompt = `Crea recetas usando estos ingredientes: ${ingredients}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'Eres un chef profesional experto. Devuelve solo una receta clara y sólo la respuesta en JSON, nada más, no pongas ´´´json{}´´´. La estructura del JSON debe ser: {receta: {nombre: "", ingredientes: [], instrucciones: []}}.',
          },
          { role: 'user', content: prompt },
        ],
      });

      const content = completion.choices[0].message.content;
      if (content) {
        return content;
      } else {
        throw new Error('No se obtuvo contenido de la respuesta.');
      }
    } catch (error) {
      console.error('Error al obtener la receta:', error);
      throw error;
    }
  }

  saveRecipeToFirebase(recipe: string, userId: string, username: string): Promise<void> {
    console.log('Guardando receta con el usuario:', username);
    const db = getDatabase();
    const recipeRef = push(ref(db, 'recipes/' + userId)); // Genera una referencia única para la receta
  
    return set(recipeRef, {
      recipe: recipe,
      username: username,
      createdAt: new Date().toISOString(),  // Agregar la fecha de creación para ayudar a ordenar
    })
      .then(() => {
        console.log('Receta guardada en Firebase');
      })
      .catch((error) => {
        console.error('Error al guardar receta en Firebase', error);
      });
  }
}  
