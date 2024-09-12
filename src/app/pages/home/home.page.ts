import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  irARecetaDelDia() {
    this.navCtrl.navigateForward('/tabs/home/recetadeldia');
  }

  irAShare() {
    this.navCtrl.navigateForward('/tabs/share');
  }
}

