import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from '../models/stage';
import { catchError, Observable, of } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private apiUrl = 'http://localhost:8080/stages'; 

  constructor(private http: HttpClient) { }


  createStege(s: Stage): Observable<Stage>{
    return this.http.post<Stage>(this.apiUrl,s).pipe(
      catchError(error => {
        console.error("Erreur lors de la creation de phase",error);
        return of({} as Stage)
        
      })
    )
  }
}
