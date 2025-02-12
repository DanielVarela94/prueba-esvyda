import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveMovieService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  sendData(movieData:any): Observable<any>{
    return this.http.post(`${this.url}/save-movie/`, movieData);
  }

  updateMovie(movieData:any, id: number): Observable<any>{
    console.log("Desde el servcio:", movieData, "id: ", id);
    
    return this.http.patch(`${this.url}/update-movie/${id}`, movieData);
  }
}
