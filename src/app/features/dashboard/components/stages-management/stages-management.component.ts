import { Component } from '@angular/core';
import { DashboardStageCardComponent } from '../dashboard-stage-card/dashboard-stage-card.component';
import { IndividualTournament } from '../../../../models/individual-tournament';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { StageRequestComponent } from "../stage-request/stage-request.component";

@Component({
  selector: 'app-stages-management',
  imports: [DashboardStageCardComponent, StageRequestComponent],
  templateUrl: './stages-management.component.html',
  styleUrl: './stages-management.component.css'
})
export class StagesManagementComponent {

  selectedtournament : IndividualTournament | ClubsTournament | null = null;

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

}
