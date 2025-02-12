import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
interface Actor {
  id: number;
  actor: string;
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
  Actors: [Actor];
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
  genres = [
    { id: 1, name: 'Acción' },
    { id: 2, name: 'Aventura' },
    { id: 3, name: 'Ciencia Ficción' },
    { id: 4, name: 'Comedia' },
    { id: 5, name: 'Drama' },
    { id: 6, name: 'Fantasía' },
    { id: 7, name: 'Terror' },
    { id: 8, name: 'Suspenso' },
    { id: 9, name: 'Romance' },
    { id: 10, name: 'Musical' },
    { id: 11, name: 'Animación' }
  ];

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private allMoviesService: AllmoviesService,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.params['id']);

    this.movie$ = this.allMoviesService.getMovie(id).pipe(
      map(response =>  response.movie)
    );
  }

  deleteMovie(movieId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      console.log(movieId);
      this.allMoviesService.deleteMovie(movieId).subscribe({
        next: (response) => {
          alert('Película eliminada correctamente');
          console.log('Redirigiendo a página principal');
          console.log(response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error eliminando película', err);
        }
      });
    }
  }

  searchGenre(genre:string){
    const idsearch = this.searchId(genre);
    console.log(idsearch);
    this.router.navigate(['search-movies-genre/', idsearch]);
  }

  searchId(genre: string){
    const id = this.genres.find(g => g.name === genre);
    return id? id.id : undefined
  }

  edit(id:number){
    if(id){
      this.router.navigate(["edit-movie/", id]);
    }
  }
}
