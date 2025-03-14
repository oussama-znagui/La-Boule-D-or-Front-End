import { Component } from '@angular/core';
import { TournamentDetailsComponent } from '../../features/tournament-page/components/tournament-details/tournament-details.component';
import { PlayersListComponent } from "../../features/tournament-page/components/players-list/players-list.component";
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-tournament-page',
  imports: [TournamentDetailsComponent, PlayersListComponent, NavBarComponent],
  templateUrl: './tournament-page.component.html',
  styleUrl: './tournament-page.component.css'
})
export class TournamentPageComponent {

   activeTab = "details";

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }
}
