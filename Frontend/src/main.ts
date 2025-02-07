import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MainMoviesComponent } from './app/main-movies/main-movies.component'

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
