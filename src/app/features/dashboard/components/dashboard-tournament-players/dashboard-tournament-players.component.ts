import { Component, EventEmitter, Output } from '@angular/core';
import { Player } from '../../../../models/player';
import { PlayerService } from '../../../../services/player.service';
import { Store } from '@ngrx/store';
import { selectRequestTournament, selectRequestTournamentClubs, selectTypeRequestTournamentState, selectZoneDataRequestTournamentState, selectZoneRequestTournamentState } from '../../../../store/tournaments/tournament.selectors';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { IndividualTournament } from '../../../../models/individual-tournament';
import { TournamentType } from '../../../../enums/tournament-type';
import { Level } from '../../../../enums/level';
import { TournamentFormat } from '../../../../enums/tournament-format';
import { Region } from '../../../../enums/region';
import { Club } from '../../../../models/club';
import { DashboardPlayerCardComponent } from '../dashboard-player-card/dashboard-player-card.component';
import { PlayersForAddListComponent } from "../players-for-add-list/players-for-add-list.component";
import { take } from 'rxjs';
import { addPlayersToRequestTournament } from '../../../../store/tournaments/tournament.actions';

@Component({
  selector: 'app-dashboard-tournament-players',
  imports: [DashboardPlayerCardComponent, PlayersForAddListComponent],
  templateUrl: './dashboard-tournament-players.component.html',
  styleUrl: './dashboard-tournament-players.component.css'
})
export class DashboardTournamentPlayersComponent {

  addedPlayers: Player[] = []
  playerToAdd: Player[] = []

  playersNumberError: string | null = null;
  numberOfPlayers: number = 0;
  

  type !: "INDIVIDUEL" | "CLUBS" ;
  tournament!: ClubsTournament | IndividualTournament;

  zone! : 'N' | 'R' | 'C' | 'CL'
  zoneData!: Region | number;

  clubs? : Club[]
  displayPlayerToAdd: boolean = false
  @Output() nextEvent: EventEmitter<void> = new EventEmitter<void>



  constructor(private playerService: PlayerService,private store: Store){
    

  }

  ngOnInit(){
    this.store.select(selectTypeRequestTournamentState).subscribe(data => this.type = data!)
    this.store.select(selectRequestTournament).subscribe(data => this.tournament = data!)
    this.store.select(selectZoneRequestTournamentState).subscribe(data => this.zone=data!)
    this.store.select(selectZoneDataRequestTournamentState).subscribe(data => this.zoneData=data!)
    this.getPlayers()
  }

  getPlayers() {
    this.playerService.getAllPlayers().subscribe(data => {
      this.playerToAdd = data;
      console.log(this.playerToAdd.length);
      
  
      
      if (this.tournament.level !== Level.ALL) {
        this.playerToAdd = this.playerToAdd.filter(p => p.level === this.tournament.level);
      }
  
     
      if (this.zone && this.zoneData) {
        switch (this.zone) {
          case 'R':
            this.playerToAdd = this.playerToAdd.filter(p => p.city && p.city.region == (this.zoneData as Region));
            break;
          case 'C':
            this.playerToAdd = this.playerToAdd.filter(p => p.city && p.city.id == (this.zoneData as number));
            break;
          case 'CL':
            this.playerToAdd = this.playerToAdd.filter(p => p.club && p.club.id == (this.zoneData as number));
            break;
        }
      }
  
     
      if (this.type === "CLUBS") {
        console.log("hello");
  
        this.store.select(selectRequestTournamentClubs).subscribe(clubs => {
          if (clubs && clubs.length > 0) {
            this.clubs = clubs;
            
            this.playerToAdd = this.playerToAdd.filter(p => 
              p.club && this.clubs!.some(club => club.id === p.club!.id)
            );
  
            console.log("filtrage :", this.playerToAdd.length);
          } else {
            console.log("Aucun ");
          }
        });
      }
    });
  }
  

  checkPlayersNumber(n: any) {
    let value =n.target.value;

    if(this.type == "CLUBS"){
      this.numberOfPlayers = value
      return
    }
    if (!value) {
        this.playersNumberError = "Obligatoire";
        return;
    }


  
    if (this.tournament.format == TournamentFormat.POINT_BASED) {
        if (value % 2 !== 0) {
            this.playersNumberError = "Nombre *2 SVP!";
            return;
        }
    } else {

        if (Math.log2(value) % 1 !== 0) {
            this.playersNumberError = "Nombre [4,8,16,32 ...] SVP!";
            return;
        }
    }

 
    this.playersNumberError = null;
    this.numberOfPlayers = value
}


addPlayers(players : Player[]){
  if(players.concat(this.addedPlayers).length > this.numberOfPlayers){
    return
  }
 this.addedPlayers =  this.addedPlayers.concat(players)
 this.playerToAdd = this.playerToAdd.filter(player => !players.some(pl => pl.id == player.id))

}

deletePlayer(p: Player){
  this.addedPlayers = this.addedPlayers.filter(p1 => p1.id != p.id)
  this.addedPlayers.push(p);
}

next(){
  this.store.dispatch(addPlayersToRequestTournament({count: this.numberOfPlayers, players: this.addedPlayers}))
  this.nextEvent.emit();

}

}
