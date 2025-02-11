import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";
import { MoviesSuggestionsComponent } from "../movies-suggestions/movies-suggestions.component";
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

@Component({
  selector: 'app-search-qualification',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule, MoviesSuggestionsComponent],
  templateUrl: './search-qualification.component.html',
  styleUrl: './search-qualification.component.css'
})


export class SearchQualificationComponent {
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
  movie$: Observable<Movie[]>;

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
        return this.allMoviesService.getMoviesQualification(id).pipe(
          map(response => {
            console.log(response);
            return response.movies
          })
        )
      })
    );

  }

  onQualificationChange(event: Event) {
    const selectedQualification = (event.target as HTMLSelectElement).value;
    console.log("Calificación:", selectedQualification);

    if (selectedQualification) {
      this.router.navigate(['/search-qualification/', selectedQualification]);
    }
  }

  searchGenre(genre:string){
    const idsearch = this.searchId(genre);
    console.log(idsearch);
    this.router.navigate(['search-movies-genre/', idsearch]);
  }

  searchId(genre: string){
    const id = this.genres.find(g => g.name === genre);
    console.log(id);
    return id? id.id : undefined
  }
}

