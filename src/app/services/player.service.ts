import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/players'; 

  constructor(private http: HttpClient) {
    
   }

   getAllPlayers(): Observable<Player[]>{
      return this.http.get<Player[]>(this.apiUrl).pipe(
        catchError(error => {
          console.error("Erreur lors de la récupération des joueurs",error);
          return of([] as Player[])
          
        })
      )
   }


}
