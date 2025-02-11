import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllmoviesService {
  private readonly _http = inject(HttpClient);
  constructor() { }
  getMovies(): Observable<any> {
    return this._http.get('http://localhost:3000/get-movies')
  }

  getMovie(id:number): Observable<any>{
    return this._http.get(`http://localhost:3000/get-movie/${id}`)
  }

  getMoviesGenre(id:number): Observable<any>{
    return this._http.get(`http://localhost:3000/get-movies-genre/${id}`)
  }

  deleteMovie(id:number): Observable<any>{
    return this._http.delete(`http://localhost:3000/delete-movie/${id}`)
  }

  getMoviesQualification(id:number): Observable<any> {
    return this._http.get(`http://localhost:3000/get-movies-qualification/${id}`)
  }

  getMoviesDate (date:string): Observable<any> {
    return this._http.get(`http://localhost:3000/get-movies-date/${date}`)
  }
}
