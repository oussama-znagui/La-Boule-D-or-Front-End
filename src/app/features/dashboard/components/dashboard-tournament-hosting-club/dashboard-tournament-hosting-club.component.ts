import { Component, EventEmitter, Output } from '@angular/core';
import { Club } from '../../../../models/club';
import { Store } from '@ngrx/store';
import { selectRequestTournament, selectRequestTournamentClubs, selectTypeRequestTournamentState, selectZoneDataRequestTournamentState, selectZoneRequestTournamentState } from '../../../../store/tournaments/tournament.selectors';
import { DashboardClubCardComponent } from '../dashboard-club-card/dashboard-club-card.component';
import { DashboardClubsListComponent } from "../dashboard-clubs-list/dashboard-clubs-list.component";
import { HostingCubsListComponent } from "../hosting-cubs-list/hosting-cubs-list.component";
import { setRequestTournament } from '../../../../store/tournaments/tournament.actions';
import { Region } from '../../../../enums/region';
import { ClubService } from '../../../../services/club.service';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { IndividualTournament } from '../../../../models/individual-tournament';

@Component({
  selector: 'app-dashboard-tournament-hosting-club',
  imports: [DashboardClubCardComponent, DashboardClubsListComponent, HostingCubsListComponent],
  templateUrl: './dashboard-tournament-hosting-club.component.html',
  styleUrl: './dashboard-tournament-hosting-club.component.css'
})
export class DashboardTournamentHostingClubComponent {

  clubs? : Club[]
  hostingClub : Club |null = null;
  displayHosting: boolean = false
  @Output() nextEvent: EventEmitter<void> = new EventEmitter<void>

  type!: "CLUBS" | "INDIVIDUEL"


  zone! : 'N' | 'R' | 'C' | 'CL'
   zoneData!: Region | number;

   totnament?: ClubsTournament | IndividualTournament


  constructor(private store: Store , private clubService: ClubService){

    

  }


  ngOnInit(){
   
    this.store.select(selectTypeRequestTournamentState).subscribe(data => this.type = data!)

    if(this.type == 'CLUBS'){
      this.store.select(selectRequestTournamentClubs).subscribe(data => this.clubs = data!)
    }else{
      this.store.select(selectZoneRequestTournamentState).subscribe(data => this.zone=data!)
      this.store.select(selectZoneDataRequestTournamentState).subscribe(data => this.zoneData=data!)
      this.clubService.getAllClubs().subscribe(data => {
        this.clubs = data
        switch (this.zone) {
          case 'R':
            this.clubs = data.filter(c => (c.city) && (c.city.region == this.zoneData! as Region))
            break;
          case 'C':
            this.clubs = data.filter(c => (c.city) && (c.city.id == this.zoneData! as number))
            break;
          case 'CL':
              this.clubs = data.filter(c =>c.id == this.zoneData! as number)
              break;
          default:
            break;
        }
      })

      
    }

  }
  
  addHostingClub(c : Club){
    this.hostingClub = c;
    

  }

  delete(c : Club){
    this.hostingClub = null

  }

  auto(){
    const random = Math.floor(Math.random() * this.clubs!.length);
  this.hostingClub =   this.clubs![random]
  }

  next(){
    this.store.select(selectRequestTournament).subscribe(data => this.totnament = data!)
    
      const updated = Object.assign({}, this.totnament ,  { hostingClub_id: this.hostingClub?.id })
      console.log(updated);
      
      this.store.dispatch(setRequestTournament({tournament: updated}))
      
    

    // this.store.dispatch(ad({count: this.numberOfTeams, teams: this.addedClubs}))
  this.nextEvent.emit();
  }



}
