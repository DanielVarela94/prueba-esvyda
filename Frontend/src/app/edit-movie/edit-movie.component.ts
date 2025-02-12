import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AllmoviesService } from '../services/allmovies.service';
import { SaveMovieService } from '../services/save-movie.service';


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
  selector: 'app-edit-movie',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})
export class EditMovieComponent {
  movieForm: FormGroup;
  movie$!: Observable<Movie>;
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
  selectedFile: File | null = null;
  srcImage: string;
  id: number = 0;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private allMoviesService: AllmoviesService,
    private router: Router,
    private fb: FormBuilder,
    private saveMovieService: SaveMovieService
  ) {
    console.log("constructor ok");
    this.srcImage = "";
    this.movieForm = this.fb.group({
      name: [''],
      image: [''],
      synopsis: [''],
      date: [''],
      genre: [''],
      studio: [''],
      age: [''],
      qualification: [''],
      duration: [''],
      actors: this.fb.array([this.createActorInput("")])
    })
    
  }

    //CREAR CAMPO ACTOR
    createActorInput(actor:any): FormGroup {
      return this.fb.group({actor: [actor]});
    }
    //OBTENER ARRAY DE ACTORES
    get actors(): FormArray{
      return this.movieForm.get('actors') as FormArray;
    }

  
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));  
    if (!this.id) {
      return;
    }
    this.allMoviesService.getMovie(this.id).subscribe({
      next: response => {
        const movie= (response.movie)
        console.log(movie);
        this.llenar(movie);
      },
      error: err => {
        console.error("Error al consultar película: ", err);
      }
    });

    
  }

  llenar(movie: any){
    console.log(movie.name);
    this.srcImage = `http://localhost:3000/files/${movie.name}.jpg `
    this.movieForm.patchValue({
      name: movie.name,

      synopsis: movie.synopsis,
      date: movie.date,
      genre: movie.genre,
      studio: movie.studio,
      age: movie.age,
      qualification: movie.qualification,
      duration: movie.duration
    });

    this.actors.clear();
      movie.Actors.forEach((actor: { actor: any; }) => {
        console.log("Actor:" + actor.actor);
        this.actors.push(this.createActorInput(actor.actor));
      });
    
  }

  onActorChange(index:number){
    if(index === this.actors.length-1){
      this.actors.push(this.createActorInput(""));
    }
  }
  

  fileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
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
  sendForm() {
    console.log('Datos enviados:', this.movieForm.value);
    if (this.movieForm.valid) {
      const formData = new FormData();
      formData.append('id', this.id.toString());
      formData.append('name', this.movieForm.value.name);
      console.log(`Selected File: ${this.selectedFile}`);
      console.log(`srcImage: ${this.srcImage}`);
      if(this.selectedFile){
        formData.append('image', (this.selectedFile).toString());
      }else{
        formData.append('image', this.srcImage);
      }
      formData.append('synopsis', this.movieForm.value.synopsis);
      formData.append('date', this.movieForm.value.date);
      formData.append('genre', this.movieForm.value.genre);
      formData.append('studio', this.movieForm.value.studio);
      const age = this.movieForm.value.age ? this.movieForm.value.age : 0;
      formData.append('age', age.toString());
      const qualification = this.movieForm.value.qualification ? this.movieForm.value.qualification : 0;
      formData.append('qualification', qualification.toString());
      const duration = this.movieForm.value.duration ? this.movieForm.value.duration : 0;
      formData.append('duration', duration.toString());

      const actors = this.movieForm.value.actors || [];
      formData.append('actors', JSON.stringify(actors));

      this.saveMovieService.updateMovie(formData, this.id).subscribe({
        next: (response) => {
          console.log('Película actualizada correctamente');
          console.log(response);
          alert('Película actualizada correctamente');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
      

      /*this.saveMovieService.updateMovie(formData, this.id).subscribe(
        response => {
          console.log(`Response: ${response}`);
          alert('¡Película guardada exitosamente!');
          this.router.navigate(['/']);
        }, error => {
          console.log(`ERROR: ${error}`);
        }
      )

      */
    } else {
      console.log('Formulario inválido o imagen no seleccionada');
    }
  }
}
