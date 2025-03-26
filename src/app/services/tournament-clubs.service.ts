import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TournamentClub } from '../models/tournament-club';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentClubsService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/pool-clubs-tournament-clubs'; 

  addTeamsToTournament(tournamentPlayersRequest: {club_id: number, tournement_id: number}[]): Observable<TournamentClub[]>{
    console.log(tournamentPlayersRequest);
    
    return this.http.post<TournamentClub[]>(this.apiUrl+"/all", tournamentPlayersRequest);
  }
}
