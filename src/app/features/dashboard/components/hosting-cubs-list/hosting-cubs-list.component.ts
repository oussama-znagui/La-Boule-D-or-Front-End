import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardClubCardComponent } from '../dashboard-club-card/dashboard-club-card.component';
import { Club } from '../../../../models/club';

@Component({
  selector: 'app-hosting-cubs-list',
  imports: [DashboardClubCardComponent],
  templateUrl: './hosting-cubs-list.component.html',
  styleUrl: './hosting-cubs-list.component.css'
})
export class HostingCubsListComponent {
  @Output() addEvent: EventEmitter<Club> = new EventEmitter<Club>();

  @Input() clubs: Club[] = [];

  addHosting(c: Club){

    this.addEvent.emit(c)
    // console.log("allo" + this.clubs.length);

    
    
  }
 

}
