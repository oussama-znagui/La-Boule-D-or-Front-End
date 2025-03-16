import { createReducer, on } from "@ngrx/store";
import { Tournament } from "../../models/tournament";
import {loadIndividualTournamentsFailure,loadIndividualTournamentsSuccess,clearTournamentFilter,setTournamentFilter, loadClubsTournamentsFailure, loadClubsTournamentsSuccess, loadClubsTournaments, loadIndividualTournaments, loadTournamentByIdSuccess, } from "./tournament.actions";
import { IndividualTournament } from "../../models/individual-tournament";
import { ClubsTournament } from "../../models/clubs-tournament";
import { TournamentFilter } from "../../models/tournament-filter";


export interface TournamentState {
  individualTournaments: IndividualTournament[];
  clubsTournaments: ClubsTournament[];
  selectedTournament: IndividualTournament | ClubsTournament | null,

  filter: TournamentFilter;
  loading: boolean;
  error: any;
}

export const initialTournamentState: TournamentState = {
  individualTournaments: [],
  clubsTournaments: [],
  filter: {},
  loading: false,
  selectedTournament: null,
  error: null
};

export const tournamentReducer = createReducer(
  initialTournamentState,
  
 
  on(loadIndividualTournaments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(loadIndividualTournamentsSuccess, (state, { tournaments }) => ({
    ...state,
    individualTournaments: tournaments,
    loading: false
  })),
  
  on(loadIndividualTournamentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
 
  on(loadClubsTournaments, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(loadClubsTournamentsSuccess, (state, { tournaments }) => ({
    ...state,
    clubsTournaments: tournaments,
    loading: false
  })),
  
  on(loadClubsTournamentsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  
  // Filters
  on(setTournamentFilter, (state, { filter }) => ({
    ...state,
    filter: {
      ...state.filter,
      ...filter
    }
  })),
  
  on(clearTournamentFilter, state => ({
    ...state,
    filter: {}
  })),


  on(loadTournamentByIdSuccess, (state, { tournament }) => ({
    ...state,
    selectedTournament: tournament,
    loading: false,
    error: null,
  }))
  
);