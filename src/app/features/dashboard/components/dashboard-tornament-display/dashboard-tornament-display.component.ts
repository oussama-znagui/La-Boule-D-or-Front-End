import { Component, Input } from '@angular/core';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { IndividualTournament } from '../../../../models/individual-tournament';
import { DashboardClubCardComponent } from "../dashboard-club-card/dashboard-club-card.component";
import { DashboardPlayerCardComponent } from "../dashboard-player-card/dashboard-player-card.component";

@Component({
  selector: 'app-dashboard-tornament-display',
  imports: [DashboardClubCardComponent, DashboardPlayerCardComponent],
  templateUrl: './dashboard-tornament-display.component.html',
  styleUrl: './dashboard-tornament-display.component.css'
})
export class DashboardTornamentDisplayComponent {

 @Input() tournament!:  ClubsTournament | IndividualTournament ;

}
