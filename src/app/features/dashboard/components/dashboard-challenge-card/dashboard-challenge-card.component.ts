import { Component, Input } from '@angular/core';
import { Challenge } from '../../../../models/challenge';

@Component({
  selector: 'app-dashboard-challenge-card',
  imports: [],
  templateUrl: './dashboard-challenge-card.component.html',
  styleUrl: './dashboard-challenge-card.component.css'
})
export class DashboardChallengeCardComponent {
  @Input() challenge!: Challenge
  

}
