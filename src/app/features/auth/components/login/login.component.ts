import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../store/auth.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup
  errorMessage: string | null = null

  constructor(private fb: FormBuilder, private authService: AuthService, private store: Store,private router: Router){
      this.loginForm = this.fb.group({
        email: ["", [Validators.required]],
        password: ["", [Validators.required]],
      })
  }


  onSubmit(){

    if(!this.loginForm.valid){
      return
    }

    console.log(this.loginForm.value);
    

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.store.dispatch(loginSuccess({ token: response.token, role: response.role, user: null }));

        console.log("Connexion réussie :", response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);   
        this.errorMessage = null;
        this.router.navigate(['/'])

      },
      error: (error) => {
        
        this.errorMessage = "Email ou mot de passe incorrect.";
      }
    });

  }

}
