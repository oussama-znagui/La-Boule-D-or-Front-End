import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { catchError, Observable, of, throwError } from 'rxjs';


interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  expiresIn: number;
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl=  "http://localhost:8080/Auth";

  constructor(private http: HttpClient) { }


  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl + "/createPlayer", player).pipe(
      catchError(error => {
        console.error("Erreur lors de la création du joueur :", error);
        return throwError(() => error); 
      })
    );
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }
}
