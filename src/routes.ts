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
    loadChildren: 'modules/Example/module#ExampleModule'
  }
];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(LAZY_ROUTES);

