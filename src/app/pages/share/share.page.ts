import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage {
  shareName: string = '';
  ingredients: string[] = [];
  instructions: string[] = [];

  constructor(private alertController: AlertController) {}

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

  async saveShare() {
    const alert = await this.alertController.create({
      header: '¡Felicidades!',
      message: 'Su receta ha sido guardada con éxito',
      buttons: ['Continuar'],
    });

    await alert.present();
  }
}
