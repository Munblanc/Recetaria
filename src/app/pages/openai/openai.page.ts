import { Component, OnInit } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-openai',
  templateUrl: './openai.page.html',
  styleUrls: ['./openai.page.scss'],
})
export class OpenaiPage implements OnInit {
  ingredients: string = '';
  recipes: string[] = []; // Cambia a un arreglo de cadenas

  constructor(private openAiService: OpenaiService) {}

  ngOnInit() {}

  async getRecipes() {
    try {
      const response = await this.openAiService.getRecipe(this.ingredients);
      this.recipes = response.split('\n'); // Divide el texto en un arreglo
    } catch (error) {
      console.error('Error al obtener recetas:', error);
    }
  }
  
}
