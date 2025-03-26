import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPlayers } from '../../../../store/players/player.selectors';
import { selectAllTournaments, selectClubsTournaments, selectIndividualTournaments } from '../../../../store/tournaments/tournament.selectors';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  cit!: number
  cp!: number
  cct!: number

  cc!: number

  constructor(private store: Store){


  }

  ngOnInit(){
    this.store.select(selectAllPlayers).subscribe(data => this.cp = data.length)
    this.store.select(selectAllTournaments).subscribe(data => this.cc = data.length)
    this.store.select(selectIndividualTournaments).subscribe(data => this.cit = data.length)
    this.store.select(selectClubsTournaments).subscribe(data => this.cct = data.length)  }


}
