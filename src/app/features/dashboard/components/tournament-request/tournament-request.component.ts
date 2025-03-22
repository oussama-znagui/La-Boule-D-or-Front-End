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
import { ClubsFotAddListComponent } from "../clubs-fot-add-list/clubs-fot-add-list.component";


@Component({
  selector: 'app-tournament-request',
  imports: [DashboardPlayerCardComponent, CommonModule, PlayersForAddListComponent, ReactiveFormsModule, DashboardClubCardComponent, HostingCubsListComponent, ClubsFotAddListComponent],
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
  displayTeamForAdd:  boolean = false;

  playersForAdd!: Observable<Player[]> ;

  playersNumberError: string | null = null;
  teamsNumberError: string | null = null;

  numberOfPlayers: number = 0;


  tournamentFornamt: TournamentFormat = TournamentFormat.POINT_BASED;


  hostingClub?: Club
  hostingClubId?: number;
  displayHostingClubs: boolean = false;
  hostingClubs?: Club[];


  tournamentPlayersRequest: {player_id: number, tournement_id: number}[] = [];

  addHosting(c: Club){    
    this.hostingClub = c ;
    this.hostingClubId = c.id
    this.displayHostingClubs = false;
  }
  displayHostingClubspop(){
    this.getHostingClubs()
    this.displayHostingClubs= true
  }
  
  
  getHostingClubs(){
    this.getClubs();
    this.clubs?.subscribe(data => this.hostingClubs = data)
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

  }


  onSubmit() {
    if (this.tournamentForm.invalid) {
      return;
    }

   
    this.tournamentForm.patchValue({
      hostingClub_id: this.hostingClubId,
    })
    
   if(this.type == 'individuel'){
    this.tournamentService.createindividualTournament(this.tournamentForm.value).subscribe(response => {
      if(response && this.addedPlayers.length > 0){
        
        this.addedPlayers.map(p => this.tournamentPlayersRequest.push({player_id: p.id, tournement_id: response.id}))
        this.tournamentPlayerService.addPlayersToTournament(this.tournamentPlayersRequest).subscribe(res =>{         
        })

      }

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



  changeTournamentType(event : any){
    this.tournamentType = event.target.value;
    this.addedPlayers = [];
    if(this.tournamentType == "CITY_LEVEL"){
      this.getCities();
  
    }
    if(this.tournamentType == "CLUB_LEVEL"){
      this.getClubs();     
    }
  }


  getCities(){
    this.cities = this.cityService.getAllCities();
  }

  getClubs(){
   
    this.clubs = this.clubService.getAllClubs();
    if(this.type == "clubs"){
      //les clubs 
    }
  }

  getplayers(){
    this.playersForAdd = this.playerService.getAllPlayers()
      if(this.tournamentType == "NATIONAL"){
                
    }
    if(this.tournamentType == "REGIONAL"){
    
      this.playersForAdd.subscribe(data => {
        data.filter(p => p.city).forEach(p=> console.log("dd" + p.city.region)
        )
      })
      this.playersForAdd = this.playersForAdd.pipe(
        map(players => players.filter(p =>p.city && p.city.region == Region[this.selectedRegion as keyof typeof Region]))
      )
    }
    if(this.tournamentType == "CITY_LEVEL"){
      this.playersForAdd = this.playersForAdd.pipe( map(players => players.filter(p =>p.city && p.city.id == this.selectedCityId)))  
    }
    if(this.tournamentType == "CLUB_LEVEL"){
      this.playersForAdd.subscribe(data => {data.filter(p => p.club).forEach(p=> console.log("dd" + p.club?.id))})
      this.playersForAdd = this.playersForAdd.pipe(map(players => players.filter(p =>p.club && p.club.id == this.selectedClubId)))
    }

  }


  addPlayers(e: Player[]){
    if(this.addedPlayers.concat(e).length > this.numberOfPlayers){
     return
      
    }
  this.addedPlayers = this.addedPlayers.concat(e); 
  this.playersForAdd = this.playersForAdd.pipe(
    map(players => players = players.filter(p => !this.addedPlayers.some(p1 => p1.id == p.id)))
   )
  }


  deletePlayer(e: Player){
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

          })
        break;
      default:
        break;
    }

  
  }

  changeLevel(l: any){
    this.playersForAdd.subscribe(data => console.log(data.length)    )

   if(l.target.value != 'ALL'){

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


  chekPlayerOrTeamsNumber(n: number): boolean{
    if(this.tournamentFornamt == TournamentFormat.KNOCKOUT){
      while (n % 2 == 0){
         n = n/2;
       }
       return n == 1;
   
    }else{
      return n%2 == 0

    }


  }

  checkTeamNumber(event: any){
    console.log("srger");
    
    if(this.type == "clubs"){
      let n = event.target.value;
  
    if(!n){
      this.teamsNumberError = "Obligatoire"
      return
    } 

    if(!this.chekPlayerOrTeamsNumber(n)){
      switch (this.tournamentFornamt) {
        case TournamentFormat.KNOCKOUT:
           this.teamsNumberError = "le nombres des clubs pour une competition doit etre [4,8,16,32,64, ...]"
          break;
          case TournamentFormat.POINT_BASED:
            this.teamsNumberError = "le nombres des clubs pour une competition : X2"
            break;
        default:
          break;
      }

    }
    else{
     
        this.teamsNumberError = null;
      
    }

    }
  }

  checkPlayersNumber(event: any){
    
    
    let n = event.target.value;
  
    if(!n){
      this.playersNumberError = "Obligatoire"
      return
    }        

    if(this.type == 'individuel' && !this.chekPlayerOrTeamsNumber(n) ){
      switch (this.tournamentFornamt) {
        case TournamentFormat.KNOCKOUT:
           this.playersNumberError = "le nombres des joueurs pour une competition doit etre [4,8,16,32,64, ...]"
          break;
          case TournamentFormat.POINT_BASED:
            this.playersNumberError = "le nombres des joueurs pour une competition : X2"
            break;
        default:
          break;
      }
    }

    
    if(this.chekPlayerOrTeamsNumber(n)){
      this.playersNumberError = null;
      this.numberOfPlayers = n;
    }

  
    
    


  }



}
