import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { PlayersSearchBarComponent } from "../../features/players-page/components/players-search-bar/players-search-bar.component";
import { Observable } from 'rxjs';
import { Player } from '../../models/player';
import { Store } from '@ngrx/store';
import { selectAllPlayers, selectPlayerState } from '../../store/players/player.selectors';
import { CommonModule } from '@angular/common';
import { PlayerCardComponent } from '../../features/player-card/player-card.component';

@Component({
  selector: 'app-players-page',
  imports: [NavBarComponent, PlayersSearchBarComponent,CommonModule, PlayerCardComponent],
  templateUrl: './players-page.component.html',
  styleUrl: './players-page.component.css'
})
export class PlayersPageComponent {
  players! : Observable<Player[]>;

  constructor(private store: Store){
    
  }

  ngOnInit(){
    this.showAllPlayers();
  }

  showAllPlayers(){
    this.players = this.store.select(selectAllPlayers);
  }


}
