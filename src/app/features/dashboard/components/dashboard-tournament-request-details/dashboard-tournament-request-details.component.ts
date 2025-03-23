import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CityService } from '../../../../services/city.service';
import { ClubService } from '../../../../services/club.service';
import { Observable } from 'rxjs';
import { City } from '../../../../models/city';
import { Club } from '../../../../models/club';
import { Region } from '../../../../enums/region';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectRequestTournament, selectTypeRequestTournamentState } from '../../../../store/tournaments/tournament.selectors';
import { setRequestTournament, setRequestTournamentZone, setRequestTournamentZoneData } from '../../../../store/tournaments/tournament.actions';
import { ClubsTournament } from '../../../../models/clubs-tournament';
import { IndividualTournament } from '../../../../models/individual-tournament';

@Component({
  selector: 'app-dashboard-tournament-request-details',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard-tournament-request-details.component.html',
  styleUrl: './dashboard-tournament-request-details.component.css'
})
export class DashboardTournamentRequestDetailsComponent {

  tournamentForm!: FormGroup;
    cities?: Observable<City[]>;
  selectedCityId: number = 0;

  clubs?: Observable<Club[]>;
  selectedClubId: number = 0;

   tournamentType: string = "NATIONAL"
   type !: "INDIVIDUEL" | "CLUBS" ;
  @Output() nextEvent: EventEmitter<any> = new EventEmitter<any>();

   regions = Object.keys(Region).filter(key => isNaN(Number(key)));
     selectedRegion: string = '';

     clubTournament?: ClubsTournament
     individuelTournament?: IndividualTournament;

     tournament : ClubsTournament | IndividualTournament | null = null;


    

  constructor( private cityService: CityService, private clubService: ClubService, private fb: FormBuilder, private store: Store){
    this.store.select(selectTypeRequestTournamentState).subscribe(data => this.type = data!)
    this.store.select(selectRequestTournament).subscribe(data => this.tournament = data)
        this.tournamentForm = this.fb.group({
          title: [this.tournament ? this.tournament.title : '', [Validators.required, Validators.minLength(3)]],
          type: [this.tournament ? this.tournament.type : '', Validators.required], 
          mode: [this.tournament ? this.tournament.mode : '', Validators.required], 
          startDate: [this.tournament ? this.tournament.startDate : '', [Validators.required, this.startDateValidator]],
        endDate: [this.tournament ? this.tournament.endDate : '', Validators.required],
        format: [this.tournament ? this.tournament.format : '', Validators.required],
        level: [this.tournament ? this.tournament.level : '', Validators.required],
        prize: [this.tournament ? this.tournament.prize : '', Validators.required], 
        rules: [this.tournament ? this.tournament.rules : '', Validators.required], 
      
       
    
        
    
    
        }, { validator: this.dateValidation })
    
    }




    ngOnInit(){
 
     
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
    this.tournamentType = event.target.value
    if(event.target.value == "CITY_LEVEL"){
      this.getCities();  
    }
    if(event.target.value == "CLUB_LEVEL"){
      this.getClubs();      
    }
  }


  getCities(){
    this.cities = this.cityService.getAllCities();
  }

  getClubs(){
    this.clubs = this.clubService.getAllClubs();
  }

  onSubmit(){
    if (this.tournamentForm.invalid) {
            return;
    }

    if (this.type == "CLUBS"){
      this.clubTournament = this.tournamentForm.value;
     this.store.dispatch(setRequestTournament({ tournament: this.clubTournament!  }));
    }
    else{
      this.individuelTournament = this.tournamentForm.value;
      this.store.dispatch(setRequestTournament({ tournament: this.individuelTournament!  }));
    }
    
    switch (this.tournamentType) {
      case "NATIONAL":
        this.store.dispatch(setRequestTournamentZone({ zone: "N" }));
        break;
      case "REGIONAL":
        this.store.dispatch(setRequestTournamentZone({ zone: "R" }));
        this.store.dispatch(setRequestTournamentZoneData({zoneData: this.selectedRegion as Region}))
        break;
        default:
      case "CITY_LEVEL":
        this.store.dispatch(setRequestTournamentZone({ zone: "C" }));
        this.store.dispatch(setRequestTournamentZoneData({zoneData: this.selectedCityId}))
          break;
        break;
    }
   

    console.log('dghtrheeey');
    
    this.nextEvent.emit();


  }


    changeRegion(r: any){
    
    
    switch (this.tournamentType) {
      case 'REGIONAL':
        this.selectedRegion = r.target.value;
       
       
        if(this.type == "CLUBS"){
          this.getClubs()
        }else{
         
        }

        break;
      case 'CITY_LEVEL':
          this.selectedCityId = r.target.value
          if(this.type == "CLUBS"){
            this.getClubs()
          }else{
           
          }
        break;
        case 'CLUB_LEVEL':
          this.selectedClubId = r.target.value
          if(this.type == "CLUBS"){
            this.getClubs()
          }else{
          
          }
         
        break;
      default:
        break;
    }

  
  }

}
