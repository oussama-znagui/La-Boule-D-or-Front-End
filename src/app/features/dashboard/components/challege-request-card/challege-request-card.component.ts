import { Component, Input } from '@angular/core';
import { Stage } from '../../../../models/stage';
import { TournamentService } from '../../../../services/tournament.service';
import { Player } from '../../../../models/player';
import { IndividualTournament } from '../../../../models/individual-tournament';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { DashboardPlayerCardComponent } from '../dashboard-player-card/dashboard-player-card.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChallengeService } from '../../../../services/challenge.service';

@Component({
  selector: 'app-challege-request-card',
  imports: [DashboardPlayerCardComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './challege-request-card.component.html',
  styleUrl: './challege-request-card.component.css'
})
export class ChallegeRequestCardComponent {

 @Input() stage!: Stage
 @Input() tournamentID!: number
 players!: Player[]
@Input() t?: 'clubs' | 'individuel' ;

playersToadd: Player[] = []

date?: Date;
raceTo?: number;


tournament!:ClubsTournament| IndividualTournament 

challengeForm! : FormGroup
 constructor(private tournamentService: TournamentService, private fb: FormBuilder, private challengeService: ChallengeService){
 

 }


  ngOnInit(){
    // this.tournamentService.getTournamentById(this.tournamentID)
    console.log("regergerger");
    console.log(this.t);
    
    console.log(this.stage.id + "id");
    console.log("alli" )
    if(this.t == 'individuel'){
       this.tournamentService.getTournamentById(this.tournamentID,"individual").subscribe(data => {
        this.tournament = data!
        console.log(this.tournament);
        
       }
       )

    }

     

  }

  add(p: Player){
      if(this.playersToadd.length >= 2){
        console.log("error");
        return
        
      }

      this.playersToadd.push(p);
      this.players = this.players.filter(p1 => p1.id == p.id)
  }


  delete(a: number){
   this.playersToadd =  this.playersToadd.slice(a,1)
  }



  setDate(e : any){
    this.date = e.target.value
  }
  setRaceTo(e : any){
    this.raceTo = e.target.value
  }


  save(){
    const toSave: {stage_id: number,receTo: number,dateTime:Date,player1_id: number,player2_id: number} = {stage_id: this.stage.id,receTo: this.raceTo!,dateTime: this.date!,player1_id: this.playersToadd[0].id,player2_id: this.playersToadd[1].id}
console.log(toSave);

    this.challengeService.addChallenge(toSave).subscribe(data => console.log(data))
  }
}
