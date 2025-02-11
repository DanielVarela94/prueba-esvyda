import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AllmoviesService } from '../services/allmovies.service';
import { Router } from '@angular/router';

interface Movie {
  id: number;
  name: string;
  image: string | null;
  synopsis: string;
  date: string;
  genre: number;
  studio: string;
  age: number;
  qualification: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

interface BackendResponse {
  message: string;
  movies: Movie[];
}
@Component({
  selector: 'list-movies',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule],
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css'
})
export class ListMoviesComponent {
movies$: Observable<Movie[]>;

  constructor(private http: HttpClient, private allMovieService: AllmoviesService, private router: Router){
    this.movies$ = this.http.get<BackendResponse>('http://localhost:3000/get-movies').pipe(
      map((response) => response.movies)
    )
  }

  deleteMovie(movieId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      console.log(movieId);
      this.allMovieService.deleteMovie(movieId).subscribe({
        next: () => {
          alert('Película eliminada correctamente');
          console.log('Redirigiendo a página principal')
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error eliminando película', err);
        }
      });
    }
  }
}
