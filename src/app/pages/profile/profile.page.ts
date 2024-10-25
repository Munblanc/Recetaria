import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDatabase, ref, set } from 'firebase/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userProfile: any;
  selectedOption: string = 'listas'; // Opción por defecto
  base64Image: string = '';
  selectedImage: string | null = null; // Propiedad para almacenar la imagen seleccionada

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
  ) {
    this.loadUserProfile();
  }

  
  
  ngOnInit() {
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.userProfile = {
          uid: user.uid,
          email: user.email,
          nombre: user.displayName || 'Sin nombre'
        };
      }
    }).catch(error => {
      console.error('Error al obtener el usuario', error);
    });
  }

  loadUserProfile() {
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe(profile => {
          this.userProfile = profile;
        });
      }
    }).catch(error => {
      console.error('Error al cargar el perfil', error);
    });
  }

  selectOption(option: string) {
    this.selectedOption = option; 
  }

  takePhoto() {
    const videoElement = document.createElement('video');
    const canvasElement = document.createElement('canvas');
    const context = canvasElement.getContext('2d');
  
    // Asegúrate de que context no es null
    if (!context) {
      console.error('Error: No se pudo obtener el contexto del lienzo.');
      return;
    }
  
    // Acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoElement.srcObject = stream;
        videoElement.play();
  
        // Capturar la imagen después de 1 segundo (o más)
        setTimeout(() => {
          context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
          const base64Image = canvasElement.toDataURL('image/png');
          this.onImageSelected(base64Image); // Llama a onImageSelected para guardar la imagen
          
          // Detener el stream de video
          stream.getTracks().forEach(track => track.stop());
        }, 1000);
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara:', error);
      });
  }
  
  onImageSelected(base64Image: string) {
    this.base64Image = base64Image; // Asigna la imagen para que se muestre en profile-icon
    this.savePhoto(); // Llama al método para guardar la imagen
  }
  

  savePhoto() {
    if (!this.base64Image) {
      console.error('No hay imagen para guardar.');
      return;
    }

    this.uploadImageToFirebase(this.base64Image); // Llama al método para subir la imagen
  }

  uploadImageToFirebase(base64Image: string) {
    const userId = this.userProfile?.uid;

    if (!userId) {
      console.error('El perfil del usuario no está disponible.');
      return;
    }

    const imageName = `${userId}/profile-image-${Date.now()}.png`;
    const imageRef = this.storage.ref(imageName);

    imageRef.putString(base64Image, 'data_url').then(() => {
      console.log('Imagen subida a Firebase Storage con éxito.');

      // Obtener la URL de descarga
      imageRef.getDownloadURL().subscribe((url) => {
        // Guardar la URL de la imagen en Realtime Database
        const db = getDatabase();
        set(ref(db, `user_images/${userId}`), {
          image: url // Guardar la URL en la base de datos
        }).then(() => {
          console.log('URL de la imagen guardada en Realtime Database.');
        }).catch((error) => {
          console.error('Error al guardar la imagen en Realtime Database:', error);
        });
      });
    }).catch(error => {
      console.error('Error al subir la imagen a Firebase Storage:', error);
    });
  }

  }


