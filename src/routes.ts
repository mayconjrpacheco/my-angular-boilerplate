import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const LAZY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'example',
    pathMatch: 'full'
  },
  {
    path: 'example',
    loadChildren: 'modules/Example#ExampleModule'
  },
  {
    path: 'example2',
    loadChildren: 'modules/Example2#Example2Module'
  }
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(LAZY_ROUTES);

