import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { TournamentsPageComponent } from "./pages/tournaments-page/tournaments-page.component";
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { TournamentPageComponent } from "./pages/tournament-page/tournament-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageComponent, TournamentsPageComponent, NavBarComponent, TournamentPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd';
}
