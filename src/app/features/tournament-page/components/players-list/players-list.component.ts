import { Component, Input } from '@angular/core';

import { TournamentPLayers } from '../../../../models/tournament-players';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-players-list',
  imports: [CommonModule],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.css'
})
export class PlayersListComponent {
  @Input() players!: TournamentPLayers[];


  ngOnInit(){
    console.log();
  }

}
