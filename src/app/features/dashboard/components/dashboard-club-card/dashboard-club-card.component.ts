import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Club } from '../../../../models/club';

@Component({
  selector: 'app-dashboard-club-card',
  imports: [],
  templateUrl: './dashboard-club-card.component.html',
  styleUrl: './dashboard-club-card.component.css'
})
export class DashboardClubCardComponent {

  @Input()  action: "ADD" | "DELETE" | "ADDtoTOURNAMENT" |"ADDED"|null = null;
  @Input() club!: Club;
  @Output() addEvent: EventEmitter<Club> = new EventEmitter<Club>();
  @Output() deleteEvent: EventEmitter<any> =  new EventEmitter<any>();
  @Output() addToTournEnvent: EventEmitter<Club> = new EventEmitter<Club>();
  @Output() deleteFromTourEnvent: EventEmitter<Club> = new EventEmitter<Club>();

  Addedclubs : Club[] = []




  addHostingClub(){
    this.addEvent.emit(this.club)

  }


  delete(){
    this.deleteEvent.emit()

  }

  addToTOurnament(){
    this.addToTournEnvent.emit(this.club);
    this.Addedclubs.push(this.club)
  }


  isAdded(c: Club): boolean{
    return this.Addedclubs.filter(cl => cl.id == c.id).length != 0


  }
  deleteFromTour(){
    this.deleteFromTourEnvent.emit(this.club);
    this.Addedclubs = this.Addedclubs.filter(c => c.id != this.club.id)

  }
}
