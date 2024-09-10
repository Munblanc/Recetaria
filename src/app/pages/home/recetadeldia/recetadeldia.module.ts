import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetadeldiaPageRoutingModule } from './recetadeldia-routing.module';

import { RecetadeldiaPage } from './recetadeldia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetadeldiaPageRoutingModule
  ],
  declarations: [RecetadeldiaPage]
})
export class RecetadeldiaPageModule {}
