import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tournament } from '../../../../models/tournament';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { IndividualTournament } from '../../../../models/individual-tournament';

@Component({
  selector: 'app-dashboard-tournaments-list',
  imports: [],
  templateUrl: './dashboard-tournaments-list.component.html',
  styleUrl: './dashboard-tournaments-list.component.css'
})
export class DashboardTournamentsListComponent {

  @Input() clubsTournaments: ClubsTournament[]  = []
  @Input()  individuelTournament: IndividualTournament[] = []

 @Output() displayEvent = new EventEmitter<IndividualTournament|ClubsTournament>();

  display(t : ClubsTournament | IndividualTournament){
    this.displayEvent.emit(t);

  }


}
