import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Example2Component } from './example2';

const ROUTES: Routes = [
  {
    path: '',
    component: Example2Component
  }
];

@NgModule({
  declarations: [
    Example2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: []
})
export class Example2Module { }
