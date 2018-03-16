import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
