import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage {
  shareName: string = '';
  ingredients: string[] = [];
  instructions: string[] = [];

  constructor(
    private alertController: AlertController,
    private recipeService: RecipeService
  ) {}

  // Método para agregar un ingrediente vacío
  addIngredient() {
    this.ingredients.push('');
  }

  // Método para eliminar un ingrediente
  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  // Método para agregar una instrucción vacía
  addInstruction() {
    this.instructions.push('');
  }

  // Método para eliminar una instrucción
  removeInstruction(index: number) {
    this.instructions.splice(index, 1);
  }

  // Agregar el método trackByIndex (opcional, pero puede mejorar el rendimiento al trabajar con listas grandes)
  trackByIndex(index: number): number {
    return index;
  }

  // Método para guardar la receta compartida
  async saveShare() {
    if (!this.shareName || this.ingredients.length === 0 || this.instructions.length === 0) {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Por favor, complete todos los campos de la receta antes de guardarla.',
        buttons: ['OK'],
      });
      await alert.present();
      return;  // Si hay campos incompletos, no guardar
    }
  
    // Crear el objeto de la receta
    const recipe = {
      name: this.shareName,
      ingredients: this.ingredients,
      instructions: this.instructions,
    };
  
    try {
      // Guardar receta SOLO en la lista 'homeRecipes'
      await this.recipeService.saveRecipe('homeRecipes', recipe);  // Guardar en 'homeRecipes' de Firebase
      
      // Mostrar un mensaje de éxito
      const alert = await this.alertController.create({
        header: '¡Felicidades!',
        message: 'Su receta ha sido guardada con éxito.',
        buttons: ['Continuar'],
      });
      await alert.present();
  
      // Limpiar los campos del formulario después de guardar la receta
      this.shareName = '';
      this.ingredients = [];
      this.instructions = [];
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Hubo un problema al guardar la receta. Por favor, intente nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
      console.error('Error al guardar la receta:', error);
    }
  }
}
