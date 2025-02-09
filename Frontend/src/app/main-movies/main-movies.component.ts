import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

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
  selector: 'app-main-movies',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule],
  templateUrl: './main-movies.component.html',
  styleUrl: './main-movies.component.css'
})
export class MainMoviesComponent {
  movies$: Observable<Movie[]>;

  constructor(private http: HttpClient){
    this.movies$ = this.http.get<BackendResponse>('http://localhost:3000/get-movies').pipe(
      map((response) => response.movies)
    )
  }
}
