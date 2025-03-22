import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StageService } from '../../../../services/stage.service';
import { CommonModule } from '@angular/common';
import { StageType } from '../../../../enums/stage-type';
import { Status } from '../../../../enums/status';
import { StageLevel } from '../../../../enums/stage-level';

@Component({
  selector: 'app-stage-request',
  imports: [ReactiveFormsModule,CommonModule   ],
  templateUrl: './stage-request.component.html',
  styleUrl: './stage-request.component.css'
})
export class StageRequestComponent {
  stageForm!: FormGroup
  @Input() tournamentId?: number
  @Input() action!: "ADD" | 'UPDATE'

  stageTypes = Object.values(StageType);
  status = Object.values(Status)
  leveles = Object.values(StageLevel)
  
  errorMessage : string | null = null

  constructor(private fb: FormBuilder, private stageService: StageService){
    this.stageForm = this.fb.group({
      roundNumber: ["", [Validators.required, Validators.min(1)]],
      type: ["", [Validators.required]],
      startDate:["", [Validators.required]],
      status: ["", [Validators.required]],
      level: ["", [Validators.required]],
      tournament_id: [""]

    })
  }

  onSubmit(){
    if (this.stageForm.invalid) {
      return;
    }

    console.log(this.action);
    
    console.log(this.action == "ADD");
    
  if(this.action == "ADD"){
    
    console.log(this.tournamentId);
    this.stageForm.patchValue({
      tournament_id: this.tournamentId,
    })
    console.log(this.stageForm.value);
    
    this.stageService.createStege(this.stageForm.value).subscribe({
      next: (response) => {
        console.log('Stage créé', response);
        this.errorMessage = null; 
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    
    })
  }


  }


 
 

}
