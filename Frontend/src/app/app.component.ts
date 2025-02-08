import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMoviesComponent } from "./main-movies/main-movies.component";
import { NavComponent } from "./nav/nav.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMoviesComponent, NavComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Películas';

}
