import { Routes } from '@angular/router';
import { MainMoviesComponent } from './main-movies/main-movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';

export const routes: Routes = [
    {path: '', component: MainMoviesComponent},
    {path: 'add-movie', component: AddMovieComponent}
];
