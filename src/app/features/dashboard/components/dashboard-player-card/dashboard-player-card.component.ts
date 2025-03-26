import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../../../models/player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-player-card',
  imports: [CommonModule],
  templateUrl: './dashboard-player-card.component.html',
  styleUrl: './dashboard-player-card.component.css'
})
export class DashboardPlayerCardComponent {
  @Input() action!: "ADD" | "DELETE";

  @Input() player!: Player

  @Output() e: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() deleteEvent: EventEmitter<Player> = new EventEmitter<Player>();

  playersToAdd: Player[] = [];

  add(player: Player){
    this.playersToAdd.push(player);
    this.e.emit(player)

  }

  isAdded(player: Player): boolean{
    const a =  this.playersToAdd.filter(p =>  p.id == player.id).length
    return a != 0

  }

  delete(p: Player){
    this.deleteEvent.emit(p);

    this.playersToAdd = this.playersToAdd.filter(pl =>  pl.id != p.id)
  }



}
