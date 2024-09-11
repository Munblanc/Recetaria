import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FridgePageRoutingModule } from './fridge-routing.module';

import { FridgePage } from './fridge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FridgePageRoutingModule
  ],
  declarations: [FridgePage]
})
export class FridgePageModule {}
