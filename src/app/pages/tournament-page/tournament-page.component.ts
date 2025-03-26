import { Component } from '@angular/core';
import { TournamentDetailsComponent } from '../../features/tournament-page/components/tournament-details/tournament-details.component';
import { PlayersListComponent } from "../../features/tournament-page/components/players-list/players-list.component";
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTournamentById } from '../../store/tournaments/tournament.actions';
import { IndividualTournament } from '../../models/individual-tournament';
import { ClubsTournament } from '../../models/clubs-tournament';
import { selectSelectedTournament } from '../../store/tournaments/tournament.selectors';
import { Observable } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { CommonModule } from '@angular/common';
import { TeamsListComponent } from '../../features/tournament-page/components/teams-list/teams-list.component';
import { DashboardChallengeCardComponent } from '../../features/dashboard/components/dashboard-challenge-card/dashboard-challenge-card.component';
import { DashboardStageCardComponent } from "../../features/dashboard/components/dashboard-stage-card/dashboard-stage-card.component";

@Component({
  selector: 'app-tournament-page',
  imports: [TournamentDetailsComponent, PlayersListComponent, NavBarComponent, CommonModule, TeamsListComponent, DashboardChallengeCardComponent, DashboardStageCardComponent],
  templateUrl: './tournament-page.component.html',
  styleUrl: './tournament-page.component.css'
})
export class TournamentPageComponent {


  activeTab = "details";
  tournamentId!: number
  type!: "individual" | "clubs";
  tournament!: Observable<Tournament | null>;

  constructor(private route: ActivatedRoute,private store: Store){}

  ngOnInit(){

    this.route.params.subscribe(param =>{
      this.tournamentId = param["id"]
      this.type = this.route.snapshot.queryParamMap.get('type') as 'individual' | 'clubs';
console.log("from compo : " + this.type);

      this.store.dispatch(loadTournamentById({ id: this.tournamentId , tournamentType: this.type }));

      console.log(this.store.select(selectSelectedTournament));
      
      this.tournament = this.store.select(selectSelectedTournament);


    })

  }


  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  getTournamentById(id: number){

  }




}
