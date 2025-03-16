import { createAction, props } from "@ngrx/store";
import { Tournament } from "../../models/tournament";
import { IndividualTournament } from "../../models/individual-tournament";
import { ClubsTournament } from "../../models/clubs-tournament";
import { TournamentFilter } from "../../models/tournament-filter";


export const loadIndividualTournaments = createAction(
    '[Tournament] Load Individual Tournaments'
  );
  
  export const loadIndividualTournamentsSuccess = createAction(
    '[Tournament] Load Individual Tournaments Success',
    props<{ tournaments: IndividualTournament[] }>()
  );
  
  export const loadIndividualTournamentsFailure = createAction(
    '[Tournament] Load Individual Tournaments Failure',
    props<{ error: any }>()
  );
  
  
  export const loadClubsTournaments = createAction(
    '[Tournament] Load Clubs Tournaments'
  );
  
  export const loadClubsTournamentsSuccess = createAction(
    '[Tournament] Load Clubs Tournaments Success',
    props<{ tournaments: ClubsTournament[] }>()
  );
  
  export const loadClubsTournamentsFailure = createAction(
    '[Tournament] Load Clubs Tournaments Failure',
    props<{ error: any }>()
  );
  
 
  export const setTournamentFilter = createAction(
    '[Tournament] Set Tournament Filter',
    props<{ filter: TournamentFilter }>()
  );
  
  export const clearTournamentFilter = createAction(
    '[Tournament] Clear Tournament Filter'
  );


  export const loadTournamentById = createAction(
    '[Tournament] Load Tournament By Id',
    props<{id: number, tournamentType: 'individual' | 'clubs'}>()
  )


  export const loadTournamentByIdSuccess = createAction(
    '[Tournament] Load Tournament By Is Success',
    props<{ tournament: Tournament | null }>()
  );
  
  export const loadTournamentByIdFailure = createAction(
    '[Tournament] Load Tournament By Id Failure',
    props<{ error: any }>()
  );