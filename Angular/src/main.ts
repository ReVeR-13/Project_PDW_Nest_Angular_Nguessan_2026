import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/root/app.config';
import { App } from './app/core/root/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
