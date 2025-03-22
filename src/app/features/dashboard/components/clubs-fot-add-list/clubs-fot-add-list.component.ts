import { Component, Input, Output } from '@angular/core';
import { Club } from '../../../../models/club';
import { DashboardClubCardComponent } from '../dashboard-club-card/dashboard-club-card.component';

@Component({
  selector: 'app-clubs-fot-add-list',
  imports: [DashboardClubCardComponent],
  templateUrl: './clubs-fot-add-list.component.html',
  styleUrl: './clubs-fot-add-list.component.css'
})
export class ClubsFotAddListComponent {

@Input()  clubs: Club[] | null = [];
@Output() Addedclubs : Club[] = []



close(){

}

addTeams(){

}


}
