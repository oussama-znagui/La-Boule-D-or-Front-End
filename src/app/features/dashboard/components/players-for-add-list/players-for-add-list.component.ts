import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../../../models/player';
import { PlayerCardComponent } from '../../../player-card/player-card.component';
import { DashboardPlayerCardComponent } from '../dashboard-player-card/dashboard-player-card.component';

@Component({
  selector: 'app-players-for-add-list',
  imports: [DashboardPlayerCardComponent],
  templateUrl: './players-for-add-list.component.html',
  styleUrl: './players-for-add-list.component.css'
})
export class PlayersForAddListComponent {
 

 @Input() players!: Player[] | null;

 playersToAdd: Player[] = [];

 @Output() e: EventEmitter<Player[]> = new EventEmitter<Player[]>();
 @Output() closeEvent: EventEmitter<string> = new EventEmitter<string>()

//  addPlayers()

add(p: any){
  this.playersToAdd.push(p);

}

addPlayers(){
  console.log(this.playersToAdd);
  
  this.e.emit(this.playersToAdd)
}

close(){
this.closeEvent.emit('')

}

detePlayer(e: Player){
  this.playersToAdd = this.playersToAdd.filter(p => p.id != e.id)
}
}
