import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExampleComponent } from './component';

const ROUTES: Routes = [
  {
    path: '',
    component: ExampleComponent
  }
];

@NgModule({
  declarations: [
    ExampleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: []
})
export class ExampleModule { }
