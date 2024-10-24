import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  irAOpenAI() {
    this.navCtrl.navigateForward('/openai'); // Asegúrate de que esta ruta esté definida en tu enrutamiento
  }

  irAShare() {
    this.navCtrl.navigateForward('/tabs/share');
  }
}

