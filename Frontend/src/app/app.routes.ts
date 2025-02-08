import { Routes } from '@angular/router';
import { MainMoviesComponent } from './main-movies/main-movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { SearchActorComponent } from './search-actor/search-actor.component';
import { SearchDateComponent } from './search-date/search-date.component';
import { SearchGenreComponent } from './search-genre/search-genre.component';
import { SearchIdComponent } from './search-id/search-id.component';
import { SearchQualificationComponent } from './search-qualification/search-qualification.component';

export const routes: Routes = [
    {path: '', component: MainMoviesComponent},
    {path: 'add-movie', component: AddMovieComponent},
    {path: 'list-movies', component: ListMoviesComponent},
    {path: 'search-actor', component: SearchActorComponent},
    {path: 'search-date', component: SearchDateComponent},
    {path: 'search-genre', component: SearchGenreComponent},
    {path: 'search-id', component: SearchIdComponent},
    {path: 'search-qualification', component: SearchQualificationComponent}
];
