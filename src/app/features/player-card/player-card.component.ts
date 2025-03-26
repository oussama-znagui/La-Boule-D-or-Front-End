import { Component, Input } from '@angular/core';
import { Player } from '../../models/player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-card',
  imports: [CommonModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css'
})
export class PlayerCardComponent {

  @Input() player!: Player

  ngOnInit(){
    console.log(this.player);
    
  }

}
