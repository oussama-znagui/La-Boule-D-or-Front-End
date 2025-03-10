import { Component } from '@angular/core';
import { TournamentsListComponent } from "../../features/tournaments-page/components/tournaments-list/tournaments-list.component";

@Component({
  selector: 'app-tournaments-page',
  imports: [TournamentsListComponent],
  templateUrl: './tournaments-page.component.html',
  styleUrl: './tournaments-page.component.css'
})
export class TournamentsPageComponent {

}
