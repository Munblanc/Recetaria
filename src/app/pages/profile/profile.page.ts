import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  selectedOption: string = 'listas'; // La opción por defecto es "Mis Listas"

  selectOption(option: string) {
    this.selectedOption = option;
  }
}
