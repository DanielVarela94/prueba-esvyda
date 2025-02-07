import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMoviesComponent } from "./main-movies/main-movies.component";
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMoviesComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Películas';
}
