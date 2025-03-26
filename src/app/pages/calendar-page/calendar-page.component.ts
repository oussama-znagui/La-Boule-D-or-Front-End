import { Component } from '@angular/core';
import { Club } from '../../models/club';
import { ClubsTournament } from '../../models/clubs-tournament';
import { IndividualTournament } from '../../models/individual-tournament';
import { Store } from '@ngrx/store';
import * as TournamentSelectors from '../../store/tournaments/tournament.selectors';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calendar-page',
  imports: [NavBarComponent,CommonModule],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent {

  clubTournaments! : ClubsTournament[]
  individuelTournaments!: IndividualTournament[];
  selectedtournament : IndividualTournament | ClubsTournament | null = null;
    type? : "individuel" | "clubs";

    selectedCHallenge: number = 0


  
  constructor(
    private store: Store,

    
  ) {}

  ngOnInit(){
    this.store.select(TournamentSelectors.selectIndividualTournaments).subscribe(data => this.individuelTournaments = data)
    this.store.select(TournamentSelectors.selectClubsTournaments).subscribe(data => this.clubTournaments = data)
  }


  changeTournament(e: any){

    console.log(e.target.value);
    console.log(this.individuelTournaments.filter(t => t.id == e.target.event).length);
    console.log(this.clubTournaments.filter(t => t.id == e.target.event).length);
    
    
    if(this.individuelTournaments.filter(t => t.id == e.target.value)[0]){
      console.log("a");
      
      this.selectedtournament = this.individuelTournaments.filter(t => t.id == e.target.value)[0]
      this.type = "individuel"
    }else{
      console.log("b");
      console.log(this.clubTournaments.filter(t => t.id == e.target.value).length);
      
      this.selectedtournament = this.clubTournaments.filter(t => t.id == e.target.value)[0]
         this.type = "clubs"

    }
    console.log(this.selectedtournament);
    
    
    
    
    
  }

  setSelectedCHallenge(event : any){
    console.log(event.target.value + "zgzervtergber");
    if(event.target.value == null){
      return
    }
    this.selectedCHallenge = event.target.value
   
    

  }

}
