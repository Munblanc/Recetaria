import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FridgePage } from './fridge.page';

const routes: Routes = [
  {
    path: '',
    component: FridgePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FridgePageRoutingModule {}
