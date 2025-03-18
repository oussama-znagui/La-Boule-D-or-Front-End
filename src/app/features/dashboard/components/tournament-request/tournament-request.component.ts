import { Component } from '@angular/core';
import { DashboardPlayerCardComponent } from '../dashboard-player-card/dashboard-player-card.component';
import { CommonModule } from '@angular/common';
import { Region } from '../../../../enums/region';
import { map, Observable } from 'rxjs';
import { City } from '../../../../models/city';
import { CityService } from '../../../../services/city.service';
import { Club } from '../../../../models/club';
import { ClubService } from '../../../../services/club.service';
import { Player } from '../../../../models/player';
import { PlayersForAddListComponent } from "../players-for-add-list/players-for-add-list.component";
import { PlayerService } from '../../../../services/player.service';
import { Level } from '../../../../enums/level';
import { TournamentFormat } from '../../../../enums/tournament-format';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardClubCardComponent } from "../dashboard-club-card/dashboard-club-card.component";
import { HostingCubsListComponent } from "../hosting-cubs-list/hosting-cubs-list.component";
import { TournamentService } from '../../../../services/tournament.service';
import { TournamentPlayerService } from '../../../../services/tournament-player.service';


@Component({
  selector: 'app-tournament-request',
  imports: [DashboardPlayerCardComponent, CommonModule, PlayersForAddListComponent, ReactiveFormsModule, DashboardClubCardComponent, HostingCubsListComponent],
  templateUrl: './tournament-request.component.html',
  styleUrl: './tournament-request.component.css'
})
export class TournamentRequestComponent {

  tournamentForm: FormGroup;
constructor(private tournamentPlayerService: TournamentPlayerService,private tournamentService: TournamentService, private cityService: CityService, private clubService: ClubService, private playerService: PlayerService, private fb: FormBuilder){

    this.tournamentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required], 
      mode: ['', Validators.required], 
      startDate: ['', [Validators.required, this.startDateValidator]],
    endDate: ['', Validators.required],
    format: ['', Validators.required],
    level: ['', Validators.required],
    prize: ['', Validators.required], 
    rules: ['', Validators.required], 
    numberOfPlayers: ['', Validators.required],
    hostingClub_id: [this.hostingClubId]

    


    }, { validator: this.dateValidation })

}

  type: "clubs" | "individuel" | null = 'individuel';

  tournamentType: string = "NATIONAL"

  regions = Object.keys(Region).filter(key => isNaN(Number(key)));
  selectedRegion: string = '';

  cities?: Observable<City[]>;
  selectedCityId: number = 0;

  clubs?: Observable<Club[]>;
  selectedClubId: number = 0;



  addedPlayers: Player[] = []

  displayPlayersForAdd: boolean = false;

  playersForAdd!: Observable<Player[]> ;

  playersNumberError: string | null = null;


  tournamentFornamt: TournamentFormat = TournamentFormat.POINT_BASED;


  hostingClub?: Club
  hostingClubId?: number;
  displayHostingClubs: boolean = false;
  hostingClubs?: Club[];


  tournamentPlayersRequest: {player_id: number, tournement_id: number}[] = [];

  addHosting(c: Club){
    console.log("egerg");
    
    this.hostingClub = c ;
    this.hostingClubId = c.id
    // console.log(this.hostingClub);
    

    this.displayHostingClubs = false;

  }
  displayHostingClubspop(){
    this.getHostingClubs()
    this.displayHostingClubs= true
  }
  
  
  getHostingClubs(){
    this.getClubs();
    this.clubs?.subscribe(data => this.hostingClubs = data)
    console.log(this.clubs);
    console.log(this.tournamentType);
    
    switch (this.tournamentType) {
      case "REGIONAL":
        this.clubs?.subscribe(data => this.hostingClubs = data.filter(c => c.city.region == this.selectedRegion))
          break;
      case "CITY_LEVEL":

          this.clubs?.subscribe(data => this.hostingClubs = data.filter(c => c.city.id == this.selectedCityId))
            break;
      case "CITY_LEVEL":

          this.hostingClubs  = []
          break
          
      default:
        break;
    }
    


  }

  



  ngOnInit(){
    // this.regions.push()
    // this.getplayers('')
    

  }


  onSubmit() {
    if (this.tournamentForm.invalid) {
      return;
    }

    console.log("to send "  + this.tournamentForm.value);
    this.tournamentForm.patchValue({
      hostingClub_id: this.hostingClubId,
    })
    console.log(this.hostingClubId);
    
   if(this.type == 'individuel'){
    this.tournamentService.createindividualTournament(this.tournamentForm.value).subscribe(response => {
      if(response && this.addedPlayers.length > 0){
        
        this.addedPlayers.map(p => this.tournamentPlayersRequest.push({player_id: p.id, tournement_id: response.id}))
        this.tournamentPlayerService.addPlayersToTournament(this.tournamentPlayersRequest).subscribe(res =>{
          console.log("added players" + res);
          
        })

      }
      console.log('added:', response);

      // this.tournamentForm.reset();
    });
   }if(this.type == 'clubs'){
    this.tournamentService.createClubstournament(this.tournamentForm.value).subscribe(response => {
      console.log('added:', response);

      // this.tournamentForm.reset();
    });
   }



  }

  startDateValidator(control: AbstractControl) {
    const today = new Date().toISOString().split('T')[0];
    if (control.value && control.value < today) {
      return { invalidStartDate: true };
    }
    return null;
  }



  dateValidation(group: AbstractControl) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate && startDate > endDate) {
      group.get('endDate')?.setErrors({ invalidDate: true });
      return { invalidDate: true };
    }
    return null;
  }


  setType(type: "clubs" | "individuel"){
    console.log("allo");
    this.type = type; 
    console.log(this.type);
  
    
  }


  changeTournamentType(event : any){
    this.tournamentType = event.target.value;
    if(this.tournamentType == "CITY_LEVEL"){
      this.getCities();
     
    }
    if(this.tournamentType == "CLUB_LEVEL"){
      this.getClubs();
      console.log("ee");
      
    }
  }


  getCities(){
    this.cities = this.cityService.getAllCities();
  }

  getClubs(){
    this.clubs = this.clubService.getAllClubs();
  this.clubs.subscribe(response => {
    console.log(response);
    
   });
   
    

    
  }

  getplayers(){
    this.playersForAdd = this.playerService.getAllPlayers()
    console.log(this.tournamentType);


    if(this.tournamentType == "NATIONAL"){
      
          
    }

    if(this.tournamentType == "REGIONAL"){
      // console.log(this.selectedRegion);
      this.playersForAdd.subscribe(data => {
        data.filter(p => p.city).forEach(p=> console.log("dd" + p.city.region)
        )
      })
      console.log("hello" + Region[this.selectedRegion as keyof typeof Region]);
      
      this.playersForAdd = this.playersForAdd.pipe(
        map(players => players.filter(p =>p.city && p.city.region == Region[this.selectedRegion as keyof typeof Region]))
  
      )
    
    }

    if(this.tournamentType == "CITY_LEVEL"){

      this.playersForAdd = this.playersForAdd.pipe(
        map(players => players.filter(p =>p.city && p.city.id == this.selectedCityId))
  
      )
        
    }


    if(this.tournamentType == "CLUB_LEVEL"){
      this.playersForAdd.subscribe(data => {
        data.filter(p => p.club).forEach(p=> console.log("dd" + p.club?.id)
        )
      })

      this.playersForAdd = this.playersForAdd.pipe(
        map(players => players.filter(p =>p.club && p.club.id == this.selectedClubId))
  
      )
        
    }



  }


  addPlayers(e: Player[]){
    console.log(e);
    
  this.addedPlayers = this.addedPlayers.concat(e); 
  console.log(this.addedPlayers);

  console.log(this.addedPlayers);
  
  }


  deletePlayer(e: Player){
    console.log("allo");
    
    this.addedPlayers= this.addedPlayers.filter(p => p.id != e.id)


  }

  changeRegion(r: any){
    
    switch (this.tournamentType) {
      case 'REGIONAL':
        this.selectedRegion = r.target.value;
       
        this.getplayers()
        break;
      case 'CITY_LEVEL':
          this.selectedCityId = r.target.value
          this.getplayers()
        break;
        case 'CLUB_LEVEL':

          this.selectedClubId = r.target.value
          this.getplayers()
          this.clubs?.subscribe(data => {
           
            this.hostingClub  = data.filter(cl => cl.id == r.target.value)[0]
            this.hostingClubId = data.filter(cl => cl.id == r.target.value)[0].id;
            
            
            console.log("hos" + this.hostingClub.name);
            
           

          })
        break;
      default:
        break;
    }

  
  }


  changeLevel(l: any){
    this.playersForAdd.subscribe(data => console.log(data.length)    )

   if(l.target.value != 'ALL'){
    console.log("rr");
    
    this.playersForAdd = this.playersForAdd.pipe(
      map(players => players.filter(p =>p.level && p.level == Level[l.target.value as keyof typeof Level]))

    )
   }else{
    console.log("ef");
    
    this.getplayers()
   }
    

    
  }

  changeFormat(event: any){
    this.tournamentFornamt = TournamentFormat[event.target.value as keyof typeof TournamentFormat]


  }



  checkPlayersNumber(event: any){
    
    
    let n = event.target.value;
  
    if(!n){
      this.playersNumberError = "Obligatoire"
      return
    }

       
    
    console.log("heey" + this.tournamentFornamt)

    if(this.type == 'individuel' && this.tournamentFornamt == TournamentFormat.POINT_BASED){
      console.log(n);
      while (n % 2 == 0){
     console.log("alloo");
      n = n/2;
    }

    if(n != 1){
      this.playersNumberError = "le nombres des joueurs pour une competition doit etre [4,8,16,32,64, ...]"
    }else{
      this.playersNumberError = null
    }
    }

  ;
    
    if(this.type == 'individuel' && this.tournamentFornamt == TournamentFormat.KNOCKOUT){
      console.log("alloo");
      
      if(n % 2 != 0){
        this.playersNumberError = "le nombres des joueurs pour une competition : X2"
      }else{
        this.playersNumberError = null
      }
    }


  }



}
