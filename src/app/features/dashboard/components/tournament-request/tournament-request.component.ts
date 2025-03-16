import { Component } from '@angular/core';
import { DashboardPlayerCardComponent } from '../dashboard-player-card/dashboard-player-card.component';
import { CommonModule } from '@angular/common';
import { Tournament } from '../../../../models/tournament';
import { TournamentType } from '../../../../enums/tournament-type';
import { Region } from '../../../../enums/region';
import { Observable } from 'rxjs';
import { City } from '../../../../models/city';
import { CityService } from '../../../../services/city.service';
import { Club } from '../../../../models/club';
import { ClubService } from '../../../../services/club.service';

@Component({
  selector: 'app-tournament-request',
  imports: [DashboardPlayerCardComponent,CommonModule],
  templateUrl: './tournament-request.component.html',
  styleUrl: './tournament-request.component.css'
})
export class TournamentRequestComponent {

constructor(private cityService: CityService, private clubService: ClubService){}

  type!: "clubs" | "individuel" | null

  tournamentType: string = "NATIONAL"

  regions = Object.keys(Region).filter(key => isNaN(Number(key)));
  selectedRegion: string = '';

  cities?: Observable<City[]>;

  clubs?: Observable<Club[]>;



  ngOnInit(){
    // this.regions.push()
  
  }

  setType(type: "clubs" | "individuel"){
    console.log("allo");
    this.type = type; 
    console.log(this.type);
  
    
  }


  changeTournamentType(event : any){
    this.tournamentType = event.target.value;
    if(this.tournamentType == "CITY_LEVEL"){
      this.getCities();
    }
    if(this.tournamentType == "CLUB_LEVEL"){
      this.getClubs();
      console.log("ee");
      
    }
  }

  getCities(){
    this.cities = this.cityService.getAllCities();
  }

  getClubs(){
    this.clubs = this.clubService.getAllClubs();
  this.clubs.subscribe(response => {
    console.log(response);
    
   });
   
    
    
  }

}
