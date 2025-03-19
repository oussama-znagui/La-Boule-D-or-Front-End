import { Component, Input, Output } from '@angular/core';
import { ClubService } from '../../../../services/club.service';
import { Club } from '../../../../models/club';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { FlashMessageComponent } from "../flash-message/flash-message.component";

@Component({
  selector: 'app-dashboard-clubs-list',
  imports: [AlertMessageComponent, FlashMessageComponent],
  templateUrl: './dashboard-clubs-list.component.html',
  styleUrl: './dashboard-clubs-list.component.css'
})
export class DashboardClubsListComponent {

  constructor(private clubService: ClubService){}
@Input() clubs: Club[] = []
clubToDelete? : number;
flashMessge: string | null = null


alert: boolean = false;


delete(c: number){
  this.alert = true;
  this.clubToDelete = c;



}  

deleteAproved(){
  console.log("hello");
  this.clubService.deleteClub(this.clubToDelete!).subscribe(data => {
    this.clubs = this.clubs.filter(c => c.id != this.clubToDelete)
    this.clubToDelete = 0;
    this.alert = false
    this.flashMessge = "Club est Supprimé avec succes"
    setTimeout(() => {
      this.flashMessge = null
    },5000)
    


  }
  )
  
}
  

}
