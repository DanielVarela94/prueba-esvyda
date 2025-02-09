import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveMovieService {
  private url = 'http://localhost:3000/save-movie';

  constructor(private http: HttpClient) { }

  sendData(movieData:any): Observable<any>{
    return this.http.post(this.url, movieData);
  }
}
