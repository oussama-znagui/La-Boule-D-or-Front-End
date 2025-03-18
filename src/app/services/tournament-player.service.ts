import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TournamentPLayers } from '../models/tournament-players';
import { TournamentPlayer } from '../models/tournament-player';

@Injectable({
  providedIn: 'root'
})
export class TournamentPlayerService {
  private apiUrl = 'http://localhost:8080/tournament-players'; 

  constructor(private http: HttpClient) { }



  addPlayersToTournament(tournamentPlayersRequest: {player_id: number, tournement_id: number}[]): Observable<TournamentPlayer[]>{
    console.log(tournamentPlayersRequest);
    
    return this.http.post<TournamentPlayer[]>(this.apiUrl+"/players", tournamentPlayersRequest);
  }
}

