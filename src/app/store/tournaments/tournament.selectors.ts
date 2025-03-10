import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IndividualTournament } from '../../models/individual-tournament';
import { ClubsTournament } from '../../models/clubs-tournament';
import { Tournament } from '../../models/tournament';
import { TournamentState } from './tournament.reducer';

export const selectTournamentState = createFeatureSelector<TournamentState>('tournament');

export const selectIndividualTournaments = createSelector(
  selectTournamentState,
  state => state.individualTournaments
);

export const selectClubsTournaments = createSelector(
  selectTournamentState,
  state => state.clubsTournaments
);

export const selectAllTournaments = createSelector(
  selectIndividualTournaments,
  selectClubsTournaments,
  (individualTournaments, clubsTournaments) => [...individualTournaments, ...clubsTournaments]
);

export const selectTournamentFilter = createSelector(
  selectTournamentState,
  state => state.filter
);

export const selectFilteredIndividualTournaments = createSelector(
  selectIndividualTournaments,
  selectTournamentFilter,
  (tournaments, filter) => filterTournaments(tournaments, filter)
);

export const selectFilteredClubsTournaments = createSelector(
  selectClubsTournaments,
  selectTournamentFilter,
  (tournaments, filter) => filterTournaments(tournaments, filter)
);

export const selectFilteredAllTournaments = createSelector(
  selectAllTournaments,
  selectTournamentFilter,
  (tournaments, filter) => filterTournaments(tournaments, filter)
);

export const selectLoading = createSelector(
  selectTournamentState,
  state => state.loading
);

export const selectError = createSelector(
  selectTournamentState,
  state => state.error
);




function filterTournaments(tournaments: Tournament[], filter: any): Tournament[] {
  if (!filter || Object.keys(filter).length === 0) {
    return tournaments;
  }

  return tournaments.filter(tournament => {
    
    if (filter.searchText && !tournament.title.toLowerCase().includes(filter.searchText.toLowerCase())) {
      return false;
    }
    
  
    if (filter.status && tournament.status.toString() !== filter.status) {
      return false;
    }
    
   
    if (filter.type && tournament.type.toString() !== filter.type) {
      return false;
    }
    
    
    if (filter.level && tournament.level.toString() !== filter.level) {
      return false;
    }
    
    
    if (filter.format && tournament.format.toString() !== filter.format) {
      return false;
    }
    
   
    if (filter.mode && tournament.mode.toString() !== filter.mode) {
      return false;
    }
    
   
    if (filter.startDate && new Date(tournament.startDate) < new Date(filter.startDate)) {
      return false;
    }
    
    
    if (filter.endDate && new Date(tournament.endDate) > new Date(filter.endDate)) {
      return false;
    }
    
    return true;
  });
}