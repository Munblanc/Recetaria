import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';  // Asegúrate de que RecipeService esté importado correctamente
import { NavController } from '@ionic/angular';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  recipes: any[] = [];
  searchTerm: string = '';  // Modelo de búsqueda
  isAdmin = false;

  constructor(
    private recipeService: RecipeService,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadRecipes();  // Cargar recetas cuando la página se inicializa
    this.authService.isAdminUser().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  // Cargar las recetas desde Firebase desde la lista 'homeRecipes'
  loadRecipes() {
    this.recipeService.getRecipes('homeRecipes').subscribe(data => {
      this.recipes = data;  // Asignar las recetas obtenidas desde Firebase
    });
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

  // Método para eliminar receta
  deleteRecipe(index: number) {
    const recipeId = this.recipes[index].id;  // Obtén el ID de la receta
    this.recipeService.deleteRecipe('homeRecipes', recipeId);  // Eliminar de 'homeRecipes' en Firebase
    this.recipes.splice(index, 1);  // Eliminar de la lista local
  }

  irAOpenAI() {
    this.navCtrl.navigateForward('/openai');
  }

  irAShare() {
    this.navCtrl.navigateForward('/tabs/share');
  }
}