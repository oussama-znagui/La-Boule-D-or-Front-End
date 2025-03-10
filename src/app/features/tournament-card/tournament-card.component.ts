import { Component, Input } from '@angular/core';
import { Tournament } from '../../models/tournament';

@Component({
  selector: 'app-tournament-card',
  imports: [],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.css'
})
export class TournamentCardComponent {
  @Input() tournament!: Tournament;

}
