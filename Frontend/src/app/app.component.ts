import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMoviesComponent } from "./main-movies/main-movies.component";
import { NavComponent } from "./nav/nav.component";
import { AllmoviesService } from './services/allmovies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMoviesComponent, NavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Películas';
  private readonly productsSvc = inject(AllmoviesService)
  products$ = this.productsSvc.getMovies();
}
