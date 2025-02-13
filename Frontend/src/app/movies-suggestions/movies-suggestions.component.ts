import { Component, Input, SimpleChanges } from '@angular/core';
import { AllmoviesService } from '../services/allmovies.service';
import { map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'movies-suggestions',
  imports: [CommonModule],
  templateUrl: './movies-suggestions.component.html',
  styleUrl: './movies-suggestions.component.css'
})
export class MoviesSuggestionsComponent {
  movies$!: Observable<Movie[]>;
  @Input() id: any;

  constructor(private allMoviesService: AllmoviesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.movies$ = this.allMoviesService.getRecomendations(this.id).pipe(
      map(response => {
        console.log(this.id);
        console.log(response);
        return response
      })
    )
  }

  searchRecomendation(id: any) {
    this.router.navigate([`/movie-details/${id}`]);
  }


}
