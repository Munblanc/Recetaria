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
  getRecipes(): Observable<any[]> {
    return this.recipesRef.valueChanges();  // Devuelve un observable con las recetas
  }

  // Guardar una nueva receta en Firebase
  saveRecipe(recipe: any): void {
    this.recipesRef.push(recipe);  // Guardar la receta en Firebase
  }

  // Eliminar una receta de Firebase por su ID
  deleteRecipe(recipeId: string): void {
    this.db.list('recipes').remove(recipeId);
  }
}
