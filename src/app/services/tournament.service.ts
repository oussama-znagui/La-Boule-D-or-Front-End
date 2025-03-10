import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { IndividualTournament } from '../models/individual-tournament';
import { ClubsTournament } from '../models/clubs-tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private apiUrl = 'http://localhost:8080/'; 
  
  constructor(private http: HttpClient) {}

  getIndividualTournaments(): Observable<IndividualTournament[]> {
    return this.http.get<IndividualTournament[]>(`${this.apiUrl}pool-individual-tournament`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des tournois individuels', error);
        return of([] as IndividualTournament[]); 
      })
    );
  }

  getClubsTournaments(): Observable<ClubsTournament[]> {
    return this.http.get<ClubsTournament[]>(`${this.apiUrl}clubs-tournament`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des tournois de clubs', error);
        return of([] as ClubsTournament[]); 
      })
    );
  }
}