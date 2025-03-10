import { createReducer, on } from "@ngrx/store";
import { Tournament } from "../../models/tournament";
import { loadTournaments, loadTournamentsFailure, loadTournamentsSucces } from "./tournament.actions";


export interface TournamentState{
    tournaments: Tournament[],
    loading: boolean;
    error: string | null;
    
}

const initialState: TournamentState = {
    tournaments: [],
    loading: false,
    error: null
  };

  export const tournamentsReducer = createReducer(
    initialState,
    on(loadTournaments, (state) => ({...state, loading: true})),
    on(loadTournamentsSucces, (state, {tournaments}) => ({ ...state, loading: false, tournaments })),
    on(loadTournamentsFailure, (state, { error }) => ({ ...state, loading: false, error }))

  );