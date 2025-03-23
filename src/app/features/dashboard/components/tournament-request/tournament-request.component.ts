import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardTournamentTeamsComponent } from "../dashboard-tournament-teams/dashboard-tournament-teams.component";
import { DashboardTournamentPlayersComponent } from "../dashboard-tournament-players/dashboard-tournament-players.component";
import { Store } from '@ngrx/store';
import { setRequestTournamentType } from '../../../../store/tournaments/tournament.actions';
import { DashboardTournamentRequestDetailsComponent } from '../dashboard-tournament-request-details/dashboard-tournament-request-details.component';
import { Club } from '../../../../models/club';


@Component({
  selector: 'app-tournament-request',
  imports: [ CommonModule, ReactiveFormsModule,DashboardTournamentRequestDetailsComponent, DashboardTournamentTeamsComponent, DashboardTournamentPlayersComponent],
  templateUrl: './tournament-request.component.html',
  styleUrl: './tournament-request.component.css'
})
export class TournamentRequestComponent {


  step: number = 1;
  type: "CLUBS" | "INDIVIDUEL" = 'INDIVIDUEL';
  

  constructor(private store: Store){

  }

  setTeams(teams: Club[] ,count: number){

  }
  getTeams(){

  }

  next(){
    console.log("fvergetgeg");
    
  
    switch (this.step) {
      case 1:
        this.store.dispatch(setRequestTournamentType({ tournamentType: this.type }));
        console.log("rfger");
      

      

        
        break;
    
      default:
        break;
    }
    this.step++;
  }

  prev(){
    switch (this.step) {
      case 2:

        
        

        
        break;
    
      default:
        break;
    }
    this.step--;
  }


//   type: "clubs" | "individuel" | null = 'individuel';
//   tournamentForm: FormGroup;

// constructor(private tournamentPlayerService: TournamentPlayerService,private tournamentService: TournamentService, private cityService: CityService, private clubService: ClubService, private playerService: PlayerService, private fb: FormBuilder){

//     this.tournamentForm = this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(3)]],
//       type: ['', Validators.required], 
//       mode: ['', Validators.required], 
//       startDate: ['', [Validators.required, this.startDateValidator]],
//     endDate: ['', Validators.required],
//     format: ['', Validators.required],
//     level: ['', Validators.required],
//     prize: ['', Validators.required], 
//     rules: ['', Validators.required], 
//     numberOfPlayers: ['', Validators.required],
//     hostingClub_id: [this.hostingClubId]

    


//     }, { validator: this.dateValidation })

// }





//   tournamentType: string = "NATIONAL"

//   regions = Object.keys(Region).filter(key => isNaN(Number(key)));
//   selectedRegion: string = '';

//   cities?: Observable<City[]>;
//   selectedCityId: number = 0;

//   clubs?: Observable<Club[]>;
//   selectedClubId: number = 0;



//   addedPlayers: Player[] = []
//   addedTeams: Club[] = []




//   tournamentFornamt: TournamentFormat = TournamentFormat.POINT_BASED;


//   hostingClub?: Club
//   hostingClubId?: number;


//   tournamentPlayersRequest: {player_id: number, tournement_id: number}[] = [];

  


//   ngOnInit(){      

//   }


//   onSubmit() {
//     if (this.tournamentForm.invalid) {
//       return;
//     }

   
//     this.tournamentForm.patchValue({
//       hostingClub_id: this.hostingClubId,
//     })
    
//    if(this.type == 'individuel'){
//     this.tournamentService.createindividualTournament(this.tournamentForm.value).subscribe(response => {
//       if(response && this.addedPlayers.length > 0){
        
//         this.addedPlayers.map(p => this.tournamentPlayersRequest.push({player_id: p.id, tournement_id: response.id}))
//         this.tournamentPlayerService.addPlayersToTournament(this.tournamentPlayersRequest).subscribe(res =>{         
//         })

//       }

//       this.tournamentForm.reset();
//     });
//    }if(this.type == 'clubs'){
//     this.tournamentService.createClubstournament(this.tournamentForm.value).subscribe(response => {
//       console.log('added:', response);

//       this.tournamentForm.reset();
//     });
//    }



//   }

//   startDateValidator(control: AbstractControl) {
//     const today = new Date().toISOString().split('T')[0];
//     if (control.value && control.value < today) {
//       return { invalidStartDate: true };
//     }
//     return null;
//   }



//   dateValidation(group: AbstractControl) {
//     const startDate = group.get('startDate')?.value;
//     const endDate = group.get('endDate')?.value;
//      if (startDate && endDate && startDate > endDate) {
//       group.get('endDate')?.setErrors({ invalidDate: true });
//       return { invalidDate: true };
//     }
//     return null;
//   }



//   changeTournamentType(event : any){
//     this.tournamentType = event.target.value;  

//     if(this.tournamentType == "CITY_LEVEL"){
//       this.getCities();  
//     }
//     if(this.tournamentType == "CLUB_LEVEL"){
//       this.getClubs();      
//     }
//   }


//   getCities(){
//     this.cities = this.cityService.getAllCities();
//   }

//   getClubs(){
//     this.clubs = this.clubService.getAllClubs();
//   }

  

  

//   changeRegion(r: any){
    
    
//     switch (this.tournamentType) {
//       case 'REGIONAL':
//         this.selectedRegion = r.target.value;
       
       
//         if(this.type == "clubs"){
//           this.getClubs()
//         }else{
         
//         }

//         break;
//       case 'CITY_LEVEL':
//           this.selectedCityId = r.target.value
//           if(this.type == "clubs"){
//             this.getClubs()
//           }else{
           
//           }
//         break;
//         case 'CLUB_LEVEL':
//           this.selectedClubId = r.target.value
//           if(this.type == "clubs"){
//             this.getClubs()
//           }else{
          
//           }
//           this.clubs?.subscribe(data => {
//           this.hostingClub  = data.filter(cl => cl.id == r.target.value)[0]
//           this.hostingClubId = data.filter(cl => cl.id == r.target.value)[0].id;

//           })
//         break;
//       default:
//         break;
//     }

  
//   }

}