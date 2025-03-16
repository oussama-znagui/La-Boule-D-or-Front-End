import { Component } from '@angular/core';
import { TournamentRequestComponent } from "../tournament-request/tournament-request.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tournaments-management',
  imports: [RouterLink],
  templateUrl: './tournaments-management.component.html',
  styleUrl: './tournaments-management.component.css'
})
export class TournamentsManagementComponent {

}
