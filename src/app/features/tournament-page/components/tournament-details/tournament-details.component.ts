import { Component, Input } from '@angular/core';
import { DatePipe } from "@angular/common"
import { TounamentMode } from '../../../../enums/tounament-mode';
import { TournamentType } from '../../../../enums/tournament-type';
import { Level } from '../../../../enums/level';
import { Club } from '../../../../models/club';
@Component({
  selector: 'app-tournament-details',
  imports: [],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.css'
})
export class TournamentDetailsComponent {
  @Input() nop!: number;
  @Input() sdate! : Date;
  @Input() edate! : Date;
  @Input() mode!: TounamentMode;
  @Input() type!: string;
  @Input( ) level!: Level;
  @Input() club!: Club;
  



  
}
