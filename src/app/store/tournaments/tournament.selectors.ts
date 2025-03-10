import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TournamentState } from "./tournament.reducer";

export const selectTournamentState = createFeatureSelector<TournamentState>("tournaments");

export const selectAllTournaments = createSelector(
    selectTournamentState,
    (state) => state.tournaments
)

export const selectTournamentsLoading = createSelector(
    selectTournamentState,
    (state) => state.loading
  );
  
  export const selectTournamentsError = createSelector(
    selectTournamentState,
    (state) => state.error
  );