import { Component } from '@angular/core';
import { TournamentsListComponent } from "../../features/tournaments-page/components/tournaments-list/tournaments-list.component";
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';



@Component({
  selector: 'app-tournaments-page',
  imports: [TournamentsListComponent,NavBarComponent],
  templateUrl: './tournaments-page.component.html',
  styleUrl: './tournaments-page.component.css'
})
export class TournamentsPageComponent {
 

}
