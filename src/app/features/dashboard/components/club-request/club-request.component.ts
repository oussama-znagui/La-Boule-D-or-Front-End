import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CityService } from '../../../../services/city.service';
import { CommonModule } from '@angular/common';
import { City } from '../../../../models/city';
import { Club } from '../../../../models/club';
import { ClubService } from '../../../../services/club.service';

@Component({
  selector: 'app-club-request',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './club-request.component.html',
  styleUrl: './club-request.component.css'
})
export class ClubRequestComponent {
  clubForm!: FormGroup;
  cities: City[] = []
  @Output() addEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private cityService: CityService,private fb: FormBuilder, private clubService: ClubService){
    this.clubForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', [Validators.required, Validators.minLength(3)]],
      city_id: ['', Validators.required,],
      capacity: ['', Validators.required],
      fondationDate: ['', Validators.required],
      area: ['', Validators.required],
    })
  }


  onSubmit(){
    console.log("alloo");
    if (this.clubForm.invalid) {
      return;
    }

    this.clubService.addClub(this.clubForm.value).subscribe(data => {this.addEvent.emit("")}
    )
  
    

  }

  ngOnInit(){
    this.cityService.getAllCities().subscribe(data => {
      this.cities = data;
    })
  }

 



}
