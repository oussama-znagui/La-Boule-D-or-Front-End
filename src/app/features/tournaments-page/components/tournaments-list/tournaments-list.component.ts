import { Component } from '@angular/core';
import { TournamentsSershBarComponent } from "../tournaments-sersh-bar/tournaments-sersh-bar.component";
import { TournamentCardComponent } from "../../../tournament-card/tournament-card.component";

@Component({
  selector: 'app-tournaments-list',
  imports: [TournamentsSershBarComponent, TournamentCardComponent],
  templateUrl: './tournaments-list.component.html',
  styleUrl: './tournaments-list.component.css'
})
export class TournamentsListComponent {

}
