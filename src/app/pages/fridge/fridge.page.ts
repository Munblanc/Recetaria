import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.page.html',
  styleUrls: ['./fridge.page.scss'],
})
export class FridgePage {
  ingredients: string[] = [];

  constructor(private alertController: AlertController) {}

  addIngredient() {
    this.ingredients.push('');
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  async searchRecipe() {
    // Aquí puedes manejar la lógica para buscar la receta basada en los ingredientes
    const alert = await this.alertController.create({
      header: 'Aún no implementado',
      message: 'Se ha realizado la búsqueda con los ingredientes proporcionados sin éxito, estamos trabajando para usted.',
      buttons: ['OK'],
      cssClass: 'custom-alert' // Clase CSS personalizada para la alerta
    });

    await alert.present();
  }
}
