import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { MenuController, AlertController, ActionSheetController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { OpenaiService } from 'src/app/services/openai.service';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userProfile: any; // Perfil del usuario
  selectedOption: string = 'listas'; // Opción seleccionada
  base64Image: string = ''; // Imagen de perfil
  showSettings: boolean = false; // Para mostrar/ocultar configuración
  isModalOpen = false; // Para mostrar/ocultar modal
  isActionSheetOpen = false; // Para mostrar/ocultar ActionSheet
  actionSheetButtons: any[] = []; // Botones del ActionSheet

  constructor(
    public menu: MenuController,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private router: Router,
    private openaiService: OpenaiService,
    private modalController: ModalController,
    private camera: Camera,
    private actionSheetController: ActionSheetController // Agregar ActionSheetController
  ) {
    this.loadUserProfile(); // Cargar datos del perfil al iniciar
  }

  ngOnInit() {
    this.authService.getCurrentUser()
      .then(user => {
        if (user) {
          this.userProfile = {
            uid: user.uid,
            email: user.email,
            nombre: user.nombre || 'Sin nombre'
          };
        }
      })
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
      });
  }

  // Método para cargar el perfil del usuario
  loadUserProfile() {
    this.authService.getCurrentUser()
      .then(user => {
        if (user) {
          this.userProfile = {
            uid: user.uid,
            email: user.email,
            nombre: user.nombre || 'Sin nombre'
          };
        }
      })
      .catch(error => console.error('Error al cargar el perfil:', error));
  }

  // Método para abrir el ActionSheet y elegir entre cámara o galería
  async openImagePicker() {
    this.isActionSheetOpen = true;

    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Usar cámara',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Seleccionar de la galería',
          handler: () => {
            this.selectFromGallery();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });
    await actionSheet.present();
  }

  // Método para tomar una foto con la cámara
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.savePhoto(); // Guardar la foto
    }, (err) => {
      console.error('Error al tomar la foto', err);
    });
  }

  // Método para seleccionar una imagen de la galería
  selectFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.savePhoto(); // Guardar la foto
    }, (err) => {
      console.error('Error al seleccionar la foto', err);
    });
  }

  // Método para guardar la foto en Firebase Storage
  savePhoto() {
    if (!this.base64Image) {
      console.error('No hay imagen para guardar.');
      return;
    }
    this.uploadImageToFirebase(this.base64Image);
  }

  // Método para subir la imagen a Firebase Storage
  uploadImageToFirebase(base64Image: string) {
    const userId = this.userProfile?.uid;
    if (!userId) {
      console.error('El perfil del usuario no está disponible.');
      return;
    }

    // Establecer el nombre del archivo de la imagen
    const imageName = `${userId}/profile-image-${Date.now()}.png`;
    const imageRef = this.storage.ref(imageName);

    // Subir la imagen a Firebase Storage
    imageRef.putString(base64Image, 'data_url')
      .then(() => {
        console.log('Imagen subida a Firebase Storage con éxito.');
      })
      .catch(error => console.error('Error al subir la imagen a Firebase Storage:', error));
  }

  // Método para cambiar la opción seleccionada (listas o recetas)
  selectOption(option: string) {
    this.selectedOption = option;
  }

  // Método para abrir el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalController.dismiss();
    this.isModalOpen = false;
  }

  // Método que se ejecuta cuando el modal se cierra
  onModalDismiss() {
    this.isModalOpen = false;
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada');
      this.closeModal();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 100);  // Retardo de 100ms para asegurar que el modal se cierre antes de navegar
    }).catch(err => {
      console.error('Error al cerrar sesión', err);
    });
  }
}  