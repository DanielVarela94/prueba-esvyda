import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AllmoviesService } from "../services/allmovies.service";
import { FormsModule } from '@angular/forms';

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
@Component({
  selector: 'app-search-actor',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './search-actor.component.html',
  styleUrl: './search-actor.component.css'
})
export class SearchActorComponent {
 qualifications = [1, 2, 3, 4, 5]

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
  movie$!: Observable<Movie[]>;
  txtActor: string = "";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private allMoviesService: AllmoviesService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.movie$ = this.route.paramMap.pipe(
      map(params => {
        const actor = params.get('actor');
        return actor ? actor : '';
      }),
      switchMap(actor => {
        console.log(actor);
        console.log("Buscando películas para el actor:", actor);
        return this.allMoviesService.getMoviesActor(actor).pipe(
          map(response => {
            console.log(response.movies);
            return response.movies
          })
        );
      })
    );
  }
  searchActor() {
    if (this.txtActor !== '') {
      this.router.navigate(['/search-movies-actor/', this.txtActor]);
    }
  }

  searchGenre(genre: string) {
    const idsearch = this.searchId(genre);
    console.log(idsearch);
    this.router.navigate(['search-movies-genre/', idsearch]);
  }

  searchId(genre: string) {
    const id = this.genres.find(g => g.name === genre);
    console.log(id);
    return id ? id.id : undefined
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

