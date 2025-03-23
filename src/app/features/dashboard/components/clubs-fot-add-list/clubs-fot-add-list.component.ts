import { Component, EventEmitter, Input, Output } from '@angular/core';
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
@Output() addClubsEvnt: EventEmitter<Club[]> = new EventEmitter<Club[]>();



close(){

}

addTeams(){
  this.addClubsEvnt.emit(this.Addedclubs);
  



}

addToTourn(c: Club){
  this.Addedclubs.push(c);


}

deleteFromTour(c: Club){
  this.Addedclubs = this.Addedclubs.filter(c1 => c1.id != c.id)

}



}
