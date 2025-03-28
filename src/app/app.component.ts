import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { TournamentsPageComponent } from "./pages/tournaments-page/tournaments-page.component";
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { TournamentPageComponent } from "./pages/tournament-page/tournament-page.component";
import { Store } from '@ngrx/store';
import { loadClubsTournaments, loadIndividualTournaments } from './store/tournaments/tournament.actions';
import { loadPlayers } from './store/players/player.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePageComponent, TournamentsPageComponent, NavBarComponent, TournamentPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontEnd';
  constructor(private store: Store) {
    this.store.dispatch(loadIndividualTournaments());
    this.store.dispatch(loadPlayers());
    this.store.dispatch(loadClubsTournaments());
    console.log("bonjour");
    
  }
}
