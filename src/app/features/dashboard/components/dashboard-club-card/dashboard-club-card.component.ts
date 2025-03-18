import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Club } from '../../../../models/club';

@Component({
  selector: 'app-dashboard-club-card',
  imports: [],
  templateUrl: './dashboard-club-card.component.html',
  styleUrl: './dashboard-club-card.component.css'
})
export class DashboardClubCardComponent {

  @Input()  action: "ADD" | "DELETE" | null = null;
  @Input() club!: Club;
  @Output() addEvent: EventEmitter<Club> = new EventEmitter<Club>();
  @Output() deleteEvent: EventEmitter<any> =  new EventEmitter<any>();


  addHostingClub(){
    this.addEvent.emit(this.club)

  }


  delete(){
    this.deleteEvent.emit()

  }

}
