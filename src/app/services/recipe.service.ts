import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Importamos AngularFireDatabase
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipesRef = this.db.list('recipes');  // Referencia a la lista de recetas en Firebase

  constructor(private db: AngularFireDatabase) { }

  // Obtener todas las recetas en tiempo real
  getRecipes(list: string): Observable<any[]> {
    return this.db.list(list).valueChanges();  // Cambia 'recipes' por el nombre de la lista que desees
  }
  
  saveRecipe(list: string, recipe: any): void {
    this.db.list(list).push(recipe);  // Guarda en la lista correspondiente
  }
  
  deleteRecipe(list: string, recipeId: string): void {
    this.db.list(list).remove(recipeId);  // Elimina de la lista correspondiente
  }
}  
