import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TournamentService } from '../../services/tournament.service';
import {
  loadIndividualTournaments,
  loadIndividualTournamentsSuccess,
  loadIndividualTournamentsFailure,
  loadClubsTournaments,
  loadClubsTournamentsSuccess,
  loadClubsTournamentsFailure
} from './tournament.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TournamentEffects {
    loadIndividualTournaments$
    loadClubTournaments$
    constructor(
        private actions$: Actions,
        private tournamentService: TournamentService
      ) {
        console.log('TournamentEffects initialized');
        console.log('actions$:', this.actions$);

        this.loadIndividualTournaments$ = createEffect(() =>
            this.actions$.pipe(
              ofType(loadIndividualTournaments),
              mergeMap(() =>
                this.tournamentService.getIndividualTournaments().pipe(
                  map((tournaments) => loadIndividualTournamentsSuccess({ tournaments })),
                  catchError((error) => of(loadIndividualTournamentsFailure({ error: error.message })))
                )
              )
            )
          );
        
        
          this.loadClubTournaments$ = createEffect(() =>
            this.actions$.pipe(
              ofType(loadClubsTournaments),
              mergeMap(() =>
                this.tournamentService.getClubsTournaments().pipe(
                  map((tournaments) => loadClubsTournamentsSuccess({ tournaments })),
                  catchError((error) => of(loadClubsTournamentsFailure({ error: error.message })))
                )
              )
            )
          );
      }


     

  

}
