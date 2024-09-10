import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetadeldiaPage } from './recetadeldia.page';

const routes: Routes = [
  {
    path: '',
    component: RecetadeldiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetadeldiaPageRoutingModule {}
