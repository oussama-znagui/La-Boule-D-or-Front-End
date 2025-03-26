import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { Referee } from '../../models/referee';
import { Club } from '../../models/club';
import { ClubService } from '../../services/club.service';
import { ClubCardComponent } from '../../features/club-card/club-card.component';

@Component({
  selector: 'app-profil-page',
  imports: [CommonModule, NavBarComponent, ClubCardComponent],
  templateUrl: './profil-page.component.html',
  styleUrl: './profil-page.component.css'
})

export class ProfilPageComponent {

  user! : Player ;

  type! : string;
  clubs! : Club[];

  selectedTab: 'S' | 'C'| 'T' ='S';
  constructor(private playerService: PlayerService, private clubService: ClubService){}


  ngOnInit(){
   this.clubService.getAllClubs().subscribe(data => this.clubs = data)
    this.playerService.getprofile().subscribe(data => {
      this.type = localStorage.getItem('role')!;
      
     
      
      if(this.type == "[ROLE_PLAYER]"){
        console.log("ghrt");
        
        this.user = data;

      }
    }
    )

  }



}
