import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";
import { MoviesSuggestionsComponent } from "../movies-suggestions/movies-suggestions.component";
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AllmoviesService } from "../services/allmovies.service";

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
  selector: 'app-search-genre',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule, MoviesSuggestionsComponent],
  templateUrl: './search-genre.component.html',
  styleUrl: './search-genre.component.css'
})
export class SearchGenreComponent {
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
  movie$: Observable<[Movie]>;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private allMoviesService: AllmoviesService,
    private router: Router
  ) {

    this.movie$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => {
        console.log(id);
        return this.allMoviesService.getMoviesGenre(id).pipe(
          map(response => {
            console.log(response);
            return response.movie
          } )
        )
      })
    );
    
  }

  onGenreChange(event: Event) {
    const selectedGenreId = (event.target as HTMLSelectElement).value;
    console.log("Género:", selectedGenreId);

    if (selectedGenreId) {
      this.router.navigate(['/search-movies-genre/', selectedGenreId]);
    }
  }

  deleteMovie(movieId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      console.log(movieId);
      this.allMoviesService.deleteMovie(movieId).subscribe({
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
