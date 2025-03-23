import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Club } from '../../../../models/club';
import { PlayerService } from '../../../../services/player.service';
import { ClubService } from '../../../../services/club.service';
import { Region } from '../../../../enums/region';
import { Store } from '@ngrx/store';
import { selectRequestTournament, selectZoneDataRequestTournamentState, selectZoneRequestTournamentState } from '../../../../store/tournaments/tournament.selectors';
import { DashboardClubsListComponent } from "../dashboard-clubs-list/dashboard-clubs-list.component";
import { ClubsFotAddListComponent } from "../clubs-fot-add-list/clubs-fot-add-list.component";
import { DashboardClubCardComponent } from "../dashboard-club-card/dashboard-club-card.component";
import { TournamentFormat } from '../../../../enums/tournament-format';
import { addTeamsToRequestTournament } from '../../../../store/tournaments/tournament.actions';

@Component({
  selector: 'app-dashboard-tournament-teams',
  imports: [DashboardClubsListComponent, ClubsFotAddListComponent, DashboardClubCardComponent],
  templateUrl: './dashboard-tournament-teams.component.html',
  styleUrl: './dashboard-tournament-teams.component.css'
})
export class DashboardTournamentTeamsComponent {
  addedClubs: Club[] = []
  ClubsToAdd: Club[] = []

  @Output() nextEvent: EventEmitter<void> = new EventEmitter<void>
  
  

  zone! : 'N' | 'R' | 'C' | 'CL'
   zoneData!: Region | number;

   displayTeamsToAdd : boolean = false;

   format : TournamentFormat | null = null;
   numberOfTeams: number = 0;
   teamsNumberError: string | null = null;

  constructor(private clubService: ClubService, private store: Store){

  }

  ngOnInit(){

  this.store.select(selectZoneRequestTournamentState).subscribe(data => this.zone=data!)
  this.store.select(selectZoneDataRequestTournamentState).subscribe(data => this.zoneData=data!)
  this.store.select(selectRequestTournament).subscribe(data => this.format = data!.format)
  this.getClubs();
  // console.log("allo" +this.ClubsToAdd.forEach(data => console.log(data)
  // ));
  
  }

  getClubs(){
  
    

    this.clubService.getAllClubs().subscribe(data => {
      this.ClubsToAdd = data
    
      switch (this.zone) {
        case 'R':
          this.ClubsToAdd = this.ClubsToAdd.filter(c => (c.city) && (c.city.region == this.zoneData! as Region))
        
         
          console.log("ebger" + this.ClubsToAdd );
          break;
        case 'C':
          this.ClubsToAdd = this.ClubsToAdd.filter(c => (c.city) && (c.city.id == this.zoneData! as number))
          break;
        default:
          break;
      }

      

      
    });
    

    console.log(this.ClubsToAdd.length +"ff" + this.zoneData);
  }

  addClubs(clubs: Club[]){
    if(clubs.concat(this.addedClubs).length > this.numberOfTeams){
      return
    }
    this.addedClubs = this.addedClubs.concat(clubs);
    this.ClubsToAdd = this.ClubsToAdd.filter(club => !clubs.some(cl => cl.id == club.id))
  }

  delete(c: Club){
    this.addedClubs = this.addedClubs.filter(c1 => c1.id != c.id)
     this.ClubsToAdd.push(c);
  }


  checkNumberOfTeams(n: any) {
    let value =n.target.value;

  
    if (!value) {
        this.teamsNumberError = "Obligatoire";
        return;
    }

  
    if (this.format == TournamentFormat.POINT_BASED) {
        if (value % 2 !== 0) {
            this.teamsNumberError = "Nombre *2 SVP!";
            return;
        }
    } else {

        if (Math.log2(value) % 1 !== 0) {
            this.teamsNumberError = "Nombre [4,8,16,32 ...] SVP!";
            return;
        }
    }

 
    this.teamsNumberError = null;
    this.numberOfTeams = value
}

generateTeams(){
  if(this.numberOfTeams == 0){
    return
  }
  this.addedClubs = []

  for (let i = 0; i < this.numberOfTeams; i++) {
    const random = Math.floor(Math.random() * this.numberOfTeams);



    this.addedClubs.push(this.ClubsToAdd[random])
    this.ClubsToAdd.splice(random,1)
    
  }
}

addTeams(){
  this.store.dispatch(addTeamsToRequestTournament({count: this.numberOfTeams, teams: this.addedClubs}))
  this.nextEvent.emit();

}

}
