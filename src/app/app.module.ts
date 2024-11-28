import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import { ProfilePageModule } from './pages/profile/profile.module';
import { initializeApp } from 'firebase/app';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireDatabaseModule,  // Importar este módulo para usar Firebase Realtime Database
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    ProfilePageModule // Importar el módulo aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
    // Asegurarse de que Firebase se inicializa con la configuración
    initializeApp(environment.firebaseConfig);
  }
}
