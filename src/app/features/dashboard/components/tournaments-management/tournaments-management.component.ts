import { Component } from '@angular/core';
import { TournamentRequestComponent } from "../tournament-request/tournament-request.component";
import { RouterLink } from '@angular/router';
import { ClubService } from '../../../../services/club.service';
import { Club } from '../../../../models/club';
import { DashboardTournamentsListComponent } from "../dashboard-tournaments-list/dashboard-tournaments-list.component";
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { IndividualTournament } from '../../../../models/individual-tournament';
import { DashboardTornamentDisplayComponent } from "../dashboard-tornament-display/dashboard-tornament-display.component";

@Component({
  selector: 'app-tournaments-management',
  imports: [RouterLink, DashboardTournamentsListComponent, DashboardTornamentDisplayComponent],
  templateUrl: './tournaments-management.component.html',
  styleUrl: './tournaments-management.component.css'
})
export class TournamentsManagementComponent {

  constructor(private tournamentService: TournamentService){}

  clubsTournaments: ClubsTournament[] = []
  individuelTournament: IndividualTournament[] = []
// displayTournament: boolean = false;
displayedTournament: IndividualTournament | ClubsTournament | null = null;

  ngOnInit(){
this.getTournaments();
  }

  getTournaments(){
    this.tournamentService.getClubsTournaments().subscribe(data =>this.clubsTournaments  =  this.clubsTournaments.concat(data))
    this.tournamentService.getIndividualTournaments().subscribe(data =>this.individuelTournament  =  this.individuelTournament.concat(data))
  }

  display(e: IndividualTournament | ClubsTournament){

    this.displayedTournament = e;
  }
}
