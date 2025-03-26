import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CityService } from '../../../../services/city.service';
import { City } from '../../../../models/city';
import { AuthService } from '../../../../services/auth.service';
import { FlashMessageComponent } from "../../../dashboard/components/flash-message/flash-message.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FlashMessageComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;
  cities!: City[]
  role?: 'P' | 'R' | 'A' ;
  flashMessge: string | null = null


  profileImagePreview: string | null = null; 
  uploading: boolean = false; 
  
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private cityService: CityService, private authService: AuthService) {
    this.signupForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.minLength(5)]],
      lastname: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      cpassword: ["", [Validators.required, Validators.minLength(8)]],
      cin: ["", [Validators.required, this.cinValidator]],  
      level: [""],
      city_id: ["", [Validators.required]],
      profileImage: ["", [Validators.required]],
    }, { validators: this.passwordMatcher });
  }

  passwordMatcher(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cpassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  cinValidator(control: AbstractControl): ValidationErrors | null {
    const cinPattern = /^[A-Z]{1,2}\s?\d{4,5}$/;  
    return cinPattern.test(control.value) ? null : { invalidCIN: true };
  }

  onSubmit() {
    
    if (!this.signupForm.valid) {
      console.log("invalid");
      console.log(this.signupForm.value);
      return  
   
  }

  if(this.role == 'P'){
    console.log('etgergegr');
    
    this.authService.createPlayer(this.signupForm.value).subscribe({
      next: (player) => {
        console.log('Joueur créé avec succès', player);
        this.errorMessage = null; 
        this.flashMessge = "Compte Ajouté Avec Succes"
        this.signupForm.reset();
        setTimeout(() => this.flashMessge =null, 5000)


      },
      error: (error) => {
        
        this.errorMessage = error.error ;
      }
    });
  }

  if(this.role == 'A'){
    
  }


  }



ngOnInit(){
  this.cityService.getAllCities().subscribe(data => this.cities = data)
}


changeRole(e: any){
  this.role = e.target.value
}


async uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'profile_pictures'); 
  formData.append('cloud_name', 'dcbrishpy'); 

  this.uploading = true;

  
  try {
    console.log('eherhe');

    const response = await fetch('https://api.cloudinary.com/v1_1/dcbrishpy/image/upload', {
      method: 'POST',
      body: formData
    });
    console.log('eherhe');
  
    
    const data = await response.json();
   
    
    this.profileImagePreview = data.secure_url; 
    console.log(data.secure_url);
    
    this.signupForm.patchValue({ profileImage: data.secure_url }); 
  } catch (error) {
    console.error("Erreur d'upload :", error);
  } finally {
    this.uploading = false;
  }
}

onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.uploadToCloudinary(file);
  }
}
}
