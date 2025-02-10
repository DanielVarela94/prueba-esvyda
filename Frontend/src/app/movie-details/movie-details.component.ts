import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AllmoviesService } from '../services/allmovies.service';
import { MoviesSuggestionsComponent } from "../movies-suggestions/movies-suggestions.component";
interface Genre {
  name: string;
}
interface Movie {
  id: number;
  name: string;
  image: string | null;
  synopsis: string;
  date: string;
  Genre: Genre;
  studio: string;
  age: number;
  qualification: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

interface BackendResponse {
  message: string;
  movie: Movie;
}

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule, MoviesSuggestionsComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie$: Observable<Movie>;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private allMoviesService: AllmoviesService
  ) {
    const id = Number(this.route.snapshot.params['id']);

    this.movie$ = this.allMoviesService.getMovie(id).pipe(
      map(response =>  response.movie)
    );
  }
}
