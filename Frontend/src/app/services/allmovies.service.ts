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
}
