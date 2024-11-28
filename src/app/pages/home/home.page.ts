import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';  // Importamos el servicio
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  recipes: any[] = [];
  searchTerm: string = '';  // Modelo de búsqueda

  constructor(
    private recipeService: RecipeService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Obtener recetas desde Firebase al iniciar el componente
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;  // Asignar las recetas obtenidas
    });
  }

  irAOpenAI() {
    this.navCtrl.navigateForward('/openai');
  }

  irAShare() {
    this.navCtrl.navigateForward('/tabs/share');
  }

  // Método para filtrar recetas
  get filteredRecipes() {
    if (!this.searchTerm) {
      return this.recipes;
    }
    return this.recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteRecipe(index: number) {
    const recipeId = this.recipes[index].id;  // Obtenemos el ID de la receta
    this.recipeService.deleteRecipe(recipeId);  // Eliminamos la receta de Firebase
    this.recipes.splice(index, 1);  // Eliminar de la lista local
  }
}
