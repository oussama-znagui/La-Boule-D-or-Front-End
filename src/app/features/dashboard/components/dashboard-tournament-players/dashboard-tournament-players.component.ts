import { Component } from '@angular/core';
import { Player } from '../../../../models/player';
import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-dashboard-tournament-players',
  imports: [],
  templateUrl: './dashboard-tournament-players.component.html',
  styleUrl: './dashboard-tournament-players.component.css'
})
export class DashboardTournamentPlayersComponent {

  addedPlayers: Player[] = []
  playerToAdd: Player[] = []

  constructor(private playerService: PlayerService){

  }

  ngOnInit(){

  }

  getPlayers(){
    
  }

}
