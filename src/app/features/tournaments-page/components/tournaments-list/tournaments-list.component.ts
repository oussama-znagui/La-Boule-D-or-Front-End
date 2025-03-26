import { Component } from '@angular/core';
import { TournamentsSershBarComponent } from "../tournaments-sersh-bar/tournaments-sersh-bar.component";
import { TournamentCardComponent } from "../../../tournament-card/tournament-card.component";
import { Observable } from 'rxjs';
import { Tournament } from '../../../../models/tournament';
import { Store } from '@ngrx/store';


import * as TournamentSelectors from '../../../../store/tournaments/tournament.selectors';
import { CommonModule } from '@angular/common';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { IndividualTournament } from '../../../../models/individual-tournament';

@Component({
  selector: 'app-tournaments-list',
  imports: [TournamentsSershBarComponent, TournamentCardComponent, CommonModule],
  templateUrl: './tournaments-list.component.html',
  styleUrl: './tournaments-list.component.css'
})
export class TournamentsListComponent {
  tournaments$!: Observable<Tournament[]>;

  clubTournaments! : ClubsTournament[]
  individuelTournaments!: IndividualTournament[];

  selectedType: 'C' | 'I' = 'C'


  constructor(
    private store: Store,

    
  ) {}
  ngOnInit(){
    // this.store.dispatch(loadIndividualTournaments());
    // this.store.dispatch(loadClubsTournaments());

    // this.showAllTournaments();

    this.store.select(TournamentSelectors.selectIndividualTournaments).subscribe(data => this.individuelTournaments = data)
    this.store.select(TournamentSelectors.selectClubsTournaments).subscribe(data => this.clubTournaments = data)


    console.log(this.tournaments$);
    
  }

  showAllTournaments(): void {
    this.tournaments$ = this.store.select(TournamentSelectors.selectAllTournaments);
  }

  changeType(e: any){
    this.selectedType = e.target.value

  }

}
