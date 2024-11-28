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

  addIngredient() {
    this.ingredients.push('');
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  addInstruction() {
    this.instructions.push('');
  }

  removeInstruction(index: number) {
    this.instructions.splice(index, 1);
  }

  // Agregar el método trackByIndex
  trackByIndex(index: number): number {
    return index;  // El índice es único para cada elemento
  }

  async saveShare() {
    const recipe = {
      name: this.shareName,
      ingredients: this.ingredients,
      instructions: this.instructions,
    };

    // Guardar receta en Firebase
    this.recipeService.saveRecipe(recipe);

    // Mostrar un mensaje de éxito
    const alert = await this.alertController.create({
      header: '¡Felicidades!',
      message: 'Su receta ha sido guardada con éxito',
      buttons: ['Continuar'],
    });

    await alert.present();

    // Limpiar los campos del formulario después de guardar la receta
    this.shareName = '';  // Limpiar el nombre
    this.ingredients = [];  // Limpiar los ingredientes
    this.instructions = [];  // Limpiar las instrucciones
  }
}
