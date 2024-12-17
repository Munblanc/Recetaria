import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { OpenaiService } from 'src/app/services/openai.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';  // Asegúrate de importar Router

interface Recipe {
  receta: string;
  nombre: string;
  ingredientes: string[];
  instrucciones: string[];
}



@Component({
  selector: 'app-openai',
  templateUrl: './openai.page.html',
  styleUrls: ['./openai.page.scss'],
})
export class OpenaiPage implements OnInit {
  ingredients: string = ''; // Almacena los ingredientes ingresados por el usuario
  recipe: Recipe | null = null;
  //recipe: string = ''; // Almacena una receta generada
  loading: boolean = false; // Controla el estado de carga (para mostrar spinner)
  isRecipeSaved: boolean = false; // Verifica si la receta ha sido guardada
  userId: string = ''; // ID del usuario
  username: string = ''; // Nombre del usuario

  static savedRecipes: Recipe[] = []; // Recetas compartidas entre páginas

  constructor(
    private authService: AuthService,
    private openaiService: OpenaiService,
    private alertController: AlertController,
    private router: Router  // Asegúrate de importar Router
  ) {}

  ngOnInit() {
    // Obtener el nombre de usuario y el ID al iniciar la página
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.userId = user.uid; // Asigna el uid del usuario
        this.username = user.nombre || 'Usuario'; // Asigna el nombre de usuario
        console.log('Usuario:', user);
      }
    });
  }

  // Método para verificar si el botón "Obtener recetas" debe estar habilitado
  canGetRecipes(): boolean {
    return this.ingredients.trim().length > 0 && !this.loading;
  }

  // Método para obtener la receta
  /* getRecipes() {
    if (this.ingredients.trim()) {
      this.loading = true;
      this.openaiService.getRecipe(this.ingredients).then((recipeContent) => {
        this.recipe = recipeContent || '';
        this.loading = false;
        this.isRecipeSaved = false;
      }).catch((error) => {
        console.error('Error al obtener receta', error);
        this.loading = false;
      });
    } else {
      console.warn('Por favor ingrese los ingredientes');
    }
  } */

    getRecipes() {
      if (this.ingredients.trim()) {
        this.loading = true;
    
        this.openaiService.getRecipe(this.ingredients)
          .then((recipeContent) => {
            try {
              // Parsear directamente el contenido de la respuesta
              const parsedResponse = JSON.parse(recipeContent);
    
              // Asignar el objeto receta desde la respuesta
              this.recipe = parsedResponse.receta;
              console.log('Receta obtenida:', this.recipe);
            } catch (error) {
              console.error('Error al parsear el JSON:', error);
              this.recipe = null; // Limpia la receta en caso de error
            } finally {
              this.loading = false; // Detener el indicador de carga
            }
          })
          .catch((error) => {
            console.error('Error al obtener receta:', error);
            this.loading = false; // Detener el indicador de carga en caso de error
          });
      }
    }


    async saveRecipe() {
      if (!this.recipe) return;
    
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Quieres guardar esta receta?',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Guardar',
            handler: () => {
              this.isRecipeSaved = true;
    
              // Convertir la receta a JSON string
              const recipeString = JSON.stringify(this.recipe);
    
              this.openaiService.saveRecipeToFirebase(recipeString, this.userId, this.username)
                .then(() => this.router.navigate(['/tabs/fridge']))
                .catch((error) => console.error('Error al guardar en Firebase:', error));
    
              // Guardar en memoria compartida (sin conversión)
              OpenaiPage.savedRecipes.push(this.recipe);
            },
          },
        ],
      });
    
      await alert.present();
    }
  // Método para guardar la receta en Firebase y en memoria compartida
  /* async saveRecipe() {
    try {
      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: '¿Quieres guardar esta receta?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Receta no guardada');
            }
          },
          {
            text: 'Guardar',
            handler: () => {
              this.isRecipeSaved = true;
  
              // Guardar en Firebase
              this.openaiService.saveRecipeToFirebase(this.recipe, this.userId, this.username)
                .then(() => {
                  console.log('Receta guardada en Firebase');
                  // Redirigir a la página de recetas guardadas (fridge)
                  this.router.navigate(['/tabs/fridge']);
                })
                .catch((error) => {
                  console.error('Error al guardar receta:', error);
                });
  
              // Guardar localmente en memoria compartida
              OpenaiPage.savedRecipes.push(this.recipe);
              console.log('Receta guardada localmente y en Firebase:', this.recipe);
            }
          }
        ]
      });
      await alert.present();
    } catch (error) {
      console.error('Error al guardar la receta:', error);
    }
  } */
  

  resetSearch() {
    this.recipe = null;
    this.ingredients = '';
    this.isRecipeSaved = false;
    this.loading = false;
  }
}
