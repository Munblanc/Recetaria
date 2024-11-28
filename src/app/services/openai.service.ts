import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { getDatabase, ref, set, push } from 'firebase/database';
import { initializeApp, getApps } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private openai: OpenAI;
  private apiKey: string = 'sk-SOn5Xnu1UY-tx4mBehAmE-_fgPoFP-k0N5UJWFm3qjT3BlbkFJnmmlFpTNyd1_AuiIjxwzMwFg82e7K3HAyK6ZAZoCAA';

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
              'Eres un experto chef profesional, saluda y genera solo una receta clara solo con los ingredientes entregados, especifíca los gramos y ml.',
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
    const recipeRef = push(ref(db, 'recipes/' + userId)); // Agrega una nueva receta bajo el ID del usuario

    return set(recipeRef, {
      recipe: recipe,
      username: username,
    })
      .then(() => {
        console.log('Receta guardada en Firebase');
      })
      .catch((error) => {
        console.error('Error al guardar receta en Firebase', error);
      });
  }
}
