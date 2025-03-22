import { Component } from '@angular/core';
import { DashboardChallengeCardComponent } from "../dashboard-challenge-card/dashboard-challenge-card.component";
import { IndividualTournament } from '../../../../models/individual-tournament';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { StageRequestComponent } from "../stage-request/stage-request.component";
import { Stage } from '../../../../models/stage';
import { DashboardChallengesListComponent } from "../dashboard-challenges-list/dashboard-challenges-list.component";

@Component({
  selector: 'app-challenges-managment',
  imports: [DashboardChallengeCardComponent, DashboardChallengesListComponent],
  templateUrl: './challenges-managment.component.html',
  styleUrl: './challenges-managment.component.css'
})
export class ChallengesManagmentComponent {

  selectedtournament : IndividualTournament | ClubsTournament | null = null;

  selectedStage: Stage | null = null;

  iTournaments!: IndividualTournament[];
  cTournaments!: ClubsTournament[]

  displayAddForm: boolean = false;

  constructor(private tournamentService: TournamentService){}

  ngOnInit(){
    this.getAllTournaments();
  }

  getAllTournaments(){
    this.tournamentService.getIndividualTournaments().subscribe(data => this.iTournaments = data)
    this.tournamentService.getClubsTournaments().subscribe(data => this.cTournaments= data)
  }



  changeTournament(e: any){
    this.selectedtournament = (this.iTournaments.filter(t => t.id == e.target.value).concat(this.cTournaments.filter(t => t.id == e.target.value)))[0]
  }

  changeStage(e: any){
    this.selectedStage = this.selectedtournament!.stages.filter(s => s.id == e.target.value)[0];
  }

}
