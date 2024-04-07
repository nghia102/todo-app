import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LoginComponent } from './app/pages/login/login.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
