import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe/recipe.service'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-recetadeldia',
  templateUrl: './recetadeldia.page.html',
  styleUrls: ['./recetadeldia.page.scss'],
})
export class RecetadeldiaPage implements OnInit {
  messages: string[] = []; // Para almacenar los mensajes y respuestas

  constructor(private recipeService: RecipeService) { }

  ngOnInit() { }

  sendMessage() {
    const inputElement = document.getElementById('message-input') as HTMLInputElement;
    const message = inputElement.value;
    if (message) {
      this.messages.push(`Usuario: ${message}`);
      this.recipeService.getRecipeResponse(message).subscribe(response => {
        this.messages.push(`Remy: ${response}`);
        inputElement.value = ''; // Limpiar el campo de entrada
        this.scrollToBottom(); // Opcional: para hacer scroll hacia el último mensaje
      });
    }
  }

  scrollToBottom() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
}
