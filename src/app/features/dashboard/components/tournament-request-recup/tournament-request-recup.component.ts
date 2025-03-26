import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectRequestTournament, selectRequestTournamentClubs, selectRequestTournamentClubsNumber, selectRequestTournamentPlayers, selectRequestTournamentPlayersNumber, selectRequestTournamentState, selectTypeRequestTournamentState } from '../../../../store/tournaments/tournament.selectors';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { IndividualTournament } from '../../../../models/individual-tournament';
import { Player } from '../../../../models/player';
import { Club } from '../../../../models/club';
import { DashboardPlayerCardComponent } from '../dashboard-player-card/dashboard-player-card.component';
import { DashboardClubCardComponent } from '../dashboard-club-card/dashboard-club-card.component';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { TournamentClubsService } from '../../../../services/tournament-clubs.service';
import { TournamentPlayerService } from '../../../../services/tournament-player.service';

@Component({
  selector: 'app-tournament-request-recup',
  imports: [DashboardPlayerCardComponent, DashboardClubCardComponent],
  templateUrl: './tournament-request-recup.component.html',
  styleUrl: './tournament-request-recup.component.css'
})
export class TournamentRequestRecupComponent {

  type!: "CLUBS" | "INDIVIDUEL" 
  tournament!: ClubsTournament | IndividualTournament
  players?: Player[];
  teams?: Club[];
  numberOfPlayers!: number
  numberOfTeams?: number
  


  constructor(private store: Store ,private tournamentService: TournamentService, private tournamentClubService: TournamentClubsService, private playerTournamenrService: TournamentPlayerService){

  }

  ngOnInit(){
    this.store.select(selectTypeRequestTournamentState).subscribe(data => this.type = data!)
    this.store.select(selectRequestTournament).subscribe(data => this.tournament = data!)
    this.store.select(selectRequestTournamentPlayers).subscribe(data => this.players = data)
    this.store.select(selectRequestTournamentClubs).subscribe(data => this.teams = data)
    this.store.select(selectRequestTournamentPlayersNumber).subscribe(data => this.numberOfPlayers = data)
    this.store.select(selectRequestTournamentClubsNumber).subscribe(data => this.numberOfTeams = data)



  }

  create(){
   
    if(this.type == "CLUBS"){
      console.log(this.numberOfPlayers);
      
      const toCreate = Object.assign({}, this.tournament ,  { numberOfTeams: this.numberOfTeams , numberOfPlayers: this.numberOfPlayers})

      this.tournamentService.createClubstournament(toCreate as ClubsTournament).subscribe(data =>{

        const teamsAdd : {club_id: number, tournement_id: number}[] = []
        this.teams!.forEach(team => {
          teamsAdd.push( {club_id: team.id, tournement_id: data.id})
        })
        console.log(teamsAdd);
        
        this.tournamentClubService.addTeamsToTournament(teamsAdd).subscribe(data => console.log(data))
       
      })
      
     
    }else{
      const toCreate = Object.assign({}, this.tournament ,  { numberOfPlayers: this.numberOfPlayers})
      this.tournamentService.createindividualTournament(toCreate as IndividualTournament).subscribe(data => {
        const playerToAdd: {player_id: number, tournement_id: number}[] = []
        this.players!.forEach(player => {
          playerToAdd.push({player_id: player.id, tournement_id: data.id})
        })

        console.log(playerToAdd);
        
        this.playerTournamenrService.addPlayersToTournament(playerToAdd).subscribe(data => console.log(data))

      }  )
    }

  }
}
