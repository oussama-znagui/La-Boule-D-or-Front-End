import { Component, Input } from '@angular/core';
import { Tournament } from '../../models/tournament';
import { CommonModule } from '@angular/common';
import {IndividualTournament} from "../../models/individual-tournament"
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-card',
  imports: [CommonModule,],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.css'
})
export class TournamentCardComponent {
  @Input() tournament!: Tournament;

  constructor(private router: Router) {}


  isClubsTournament(tournament: Tournament):boolean{
   return 'numberOfTeams' in tournament;
 }

 goToTournament(id: number){
  const type = this.isClubsTournament(this.tournament) ? 'clubs' : 'individual';
  
  this.router.navigate([`/tournaments/${id}`], { queryParams: { type } });
}
}