import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Challenge } from '../models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
apiUrl = "http://localhost:8080/challenges"
  constructor(private http: HttpClient) { }


  addChallenge(toAdd:  {stage_id: number,receTo: number,dateTime:Date,player1_id: number,player2_id: number}): Observable<Challenge>{
    return this.http.post<Challenge>(this.apiUrl,toAdd).pipe(
      catchError(error => {
        console.error(error);
          return of({} as Challenge)
      })
    )
  }

}
