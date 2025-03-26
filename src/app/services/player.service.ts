import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Player } from '../models/player';
import { User } from '../models/user';

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
          console.error(error);
          return of([] as Player[])
          
        })
      )
   }

   getprofile(): Observable<Player>{
    return this.http.get<Player>(this.apiUrl+"/profile").pipe(
      catchError(error => {
        console.error(error);
        return of({} as Player)
        
      })
    
    )
   }


}
