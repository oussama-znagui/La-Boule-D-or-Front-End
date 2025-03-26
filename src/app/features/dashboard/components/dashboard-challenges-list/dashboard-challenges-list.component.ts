import { Component, Input } from '@angular/core';
import { DashboardChallengeCardComponent } from '../dashboard-challenge-card/dashboard-challenge-card.component';
import { ChallegeRequestCardComponent } from "../challege-request-card/challege-request-card.component";
import { Stage } from '../../../../models/stage';

@Component({
  selector: 'app-dashboard-challenges-list',
  imports: [DashboardChallengeCardComponent, ChallegeRequestCardComponent],
  templateUrl: './dashboard-challenges-list.component.html',
  styleUrl: './dashboard-challenges-list.component.css'
})
export class DashboardChallengesListComponent {
  displayAddForm: boolean = false

 @Input() stage!: Stage
 @Input() tournamentID!: number
 @Input()   t!: 'clubs' | 'individuel' ;

  



}
