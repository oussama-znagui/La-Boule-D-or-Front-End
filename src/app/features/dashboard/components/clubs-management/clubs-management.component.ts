import { Component, Input } from '@angular/core';
import { ClubRequestComponent } from "../club-request/club-request.component";
import { Club } from '../../../../models/club';
import { DashboardClubsListComponent } from "../dashboard-clubs-list/dashboard-clubs-list.component";
import { ClubService } from '../../../../services/club.service';
import { FlashMessageComponent } from "../flash-message/flash-message.component";

@Component({
  selector: 'app-clubs-management',
  imports: [ClubRequestComponent, DashboardClubsListComponent, FlashMessageComponent],
  templateUrl: './clubs-management.component.html',
  styleUrl: './clubs-management.component.css'
})
export class ClubsManagementComponent {
  displayDivForAdd: boolean = false;
 clubs: Club[] = []
 flashMessge: string | null = null

  constructor(private clubService: ClubService){}


  
  ngOnInit(){
    this.getClubs()
  }
    
  added(){
    this.displayDivForAdd = false;
    this.getClubs()
    this.flashMessge = "Club Ajouté Avec Succes"
    setTimeout(() => this.flashMessge =null, 5000)
  }

  getClubs(){

    this.clubService.getAllClubs().subscribe(data => {
      this.clubs = data
    })

  }


}
