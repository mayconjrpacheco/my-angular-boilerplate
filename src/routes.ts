import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ExampleModule } from 'modules/Example';
import { Example2Module } from 'modules/Example2'

const LAZY_ROUTES: Routes = [
  {
    path: 'example',
    loadChildren: () => ExampleModule
  },
  {
    path: 'example2',
    loadChildren: () => Example2Module
  }
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(LAZY_ROUTES);

