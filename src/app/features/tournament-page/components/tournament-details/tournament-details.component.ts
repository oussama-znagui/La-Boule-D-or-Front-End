import { Component } from '@angular/core';
import { DatePipe } from "@angular/common"
@Component({
  selector: 'app-tournament-details',
  imports: [],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.css'
})
export class TournamentDetailsComponent {

  formatDate(dateString: string): string {
    const date = new Date(dateString)
    const datePipe = new DatePipe("fr-FR")
    return datePipe.transform(date, "d MMMM yyyy à HH'h'mm") || ""
  }

}
