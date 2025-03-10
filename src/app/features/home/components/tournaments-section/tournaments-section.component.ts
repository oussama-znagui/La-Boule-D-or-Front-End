import { Component } from '@angular/core';
import { TournamentCardComponent } from '../../../tournament-card/tournament-card.component';

@Component({
  selector: 'app-tournaments-section',
  imports: [TournamentCardComponent],
  templateUrl: './tournaments-section.component.html',
  styleUrl: './tournaments-section.component.css'
})
export class TournamentsSectionComponent {

}
