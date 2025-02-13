import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { SaveMovieService } from '../services/save-movie.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'add-movie',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})
export class AddMovieComponent {
  movieForm: FormGroup;

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

  constructor(private fb: FormBuilder, private saveMovieService: SaveMovieService, private router: Router) {
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
      actors: this.fb.array([this.createActorInput()])
    })
  }

  //CREAR CAMPO ACTOR
  createActorInput(): FormGroup {
    return this.fb.group({actor: ['']});
  }
  //OBTENER ARRAY DE ACTORES
  get actors(): FormArray{
    return this.movieForm.get('actors') as FormArray;
  }

  //AGREGAR UN NUEVO CAMPO 
  onActorChange(index:number){
    if(index === this.actors.length-1){
      this.actors.push(this.createActorInput());
    }
  }

  fileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  sendForm() {
    console.log('Datos enviados:', this.movieForm.value);
    if (this.movieForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.movieForm.value.name);
      formData.append('image', this.selectedFile);
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
      this.saveMovieService.sendData(formData).subscribe(
        response => {
          console.log(`Pelicula guardada ${response}`);
          alert('¡Película guardada exitosamente!');
          this.router.navigate(['/']);
        }, error => {
          console.log(`ERROR: ${error}`);
        }
      )
    } else {
      console.log('Formulario inválido o imagen no seleccionada');
    }
  }
}
