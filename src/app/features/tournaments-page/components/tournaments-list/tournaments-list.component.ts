import { Component } from '@angular/core';
import { TournamentsSershBarComponent } from "../tournaments-sersh-bar/tournaments-sersh-bar.component";
import { TournamentCardComponent } from "../../../tournament-card/tournament-card.component";
import { Observable } from 'rxjs';
import { Tournament } from '../../../../models/tournament';
import { Store } from '@ngrx/store';
import {
  loadIndividualTournaments,
  loadClubsTournaments,
} from '../../../../store/tournaments/tournament.actions';


import * as TournamentSelectors from '../../../../store/tournaments/tournament.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournaments-list',
  imports: [TournamentsSershBarComponent, TournamentCardComponent, CommonModule],
  templateUrl: './tournaments-list.component.html',
  styleUrl: './tournaments-list.component.css'
})
export class TournamentsListComponent {
  tournaments$!: Observable<Tournament[]>;


  constructor(
    private store: Store,

    
  ) {}
  ngOnInit(){
    // this.store.dispatch(loadIndividualTournaments());
    // this.store.dispatch(loadClubsTournaments());

    this.showAllTournaments();

    console.log(this.tournaments$);
    
  }

  showAllTournaments(): void {
    this.tournaments$ = this.store.select(TournamentSelectors.selectFilteredAllTournaments);
  }

}
