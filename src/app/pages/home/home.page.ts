import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';  // Asegúrate de que RecipeService esté importado correctamente
import { NavController } from '@ionic/angular';
import { AuthService } from '../../auth.service';
import { getDatabase, ref, get } from 'firebase/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  recipes: any[] = [];
  searchTerm: string = '';  // Modelo de búsqueda
  isAdmin = false;
  private adminSubscription?: Subscription;

  constructor(
    private recipeService: RecipeService,
    private navCtrl: NavController,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.loadRecipes();  // Cargar recetas cuando la página se inicializa
    /* this.authService.isAdminUser().subscribe(isAdmin => {
      this.isAdmin = isAdmin; 
      
    }); */
    //this.checkAdminStatus();
    this.adminSubscription = this.authService.isCurrentUserAdmin().subscribe(
      isAdmin => {
        console.log('Estado de admin:', isAdmin); // Para debugging
        this.isAdmin = isAdmin;
      },
      error => {
        console.error('Error al verificar estado de admin:', error);
      }
    );
  }

  ngOnDestroy() {
    // Limpiar la suscripción cuando el componente se destruye
    if (this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }
  }

  // Cargar las recetas desde Firebase desde la lista 'homeRecipes'
  loadRecipes() {
    this.recipeService.getRecipes('homeRecipes').subscribe(data => {
      this.recipes = data;  // Asignar las recetas obtenidas desde Firebase
    });
  }

  // Método para filtrar recetas
  get filteredRecipes() {
    if (!this.searchTerm) {
      return this.recipes;
    }
    return this.recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Método para eliminar receta
  deleteRecipe(index: number) {
    const recipeId = this.recipes[index].id;  // Obtén el ID de la receta
    this.recipeService.deleteRecipe('homeRecipes', recipeId);  // Eliminar de 'homeRecipes' en Firebase
    this.recipes.splice(index, 1);  // Eliminar de la lista local
  }

  irAOpenAI() {
    this.navCtrl.navigateForward('/openai');
  }

  irAShare() {
    this.navCtrl.navigateForward('/tabs/share');
  }

  private async checkAdminStatus() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const db = getDatabase();
        const userRoleRef = ref(db, `userRoles/${user.uid}`);
        const snapshot = await get(userRoleRef);

        console.log('UID del usuario:', user.uid); // Esto mostrará el UID
        console.log('Datos del rol:', snapshot.val());
        
        this.isAdmin = snapshot.exists() && snapshot.val().isAdmin === true;
        console.log('¿Es admin?:', this.isAdmin)
      } else {
        this.isAdmin = false;
      }
    } catch (error) {
      console.error('Error al verificar el estado de admin:', error);
      this.isAdmin = false;
    }
  }
}