import { createReducer, on } from "@ngrx/store";
import { Tournament } from "../../models/tournament";
import {loadIndividualTournamentsFailure,loadIndividualTournamentsSuccess,clearTournamentFilter,setTournamentFilter, loadClubsTournamentsFailure, loadClubsTournamentsSuccess, loadClubsTournaments, loadIndividualTournaments, loadTournamentByIdSuccess, setRequestTournamentType, setRequestTournament, addPlayersToRequestTournament, addTeamsToRequestTournament, setRequestTournamentError, resetRequestTournament, setRequestTournamentZone, setRequestTournamentZoneData, } from "./tournament.actions";
import { IndividualTournament } from "../../models/individual-tournament";
import { ClubsTournament } from "../../models/clubs-tournament";
import { TournamentFilter } from "../../models/tournament-filter";
import { Player } from "../../models/player";
import { Club } from "../../models/club";
import { Region } from "../../enums/region";


export interface TournamentState {
  individualTournaments: IndividualTournament[];
  clubsTournaments: ClubsTournament[];
  selectedTournament: IndividualTournament | ClubsTournament | null,

  filter: TournamentFilter;
  loading: boolean;
  error: any;
}

export interface RequestTournamentState{
  tournamentType: "INDIVIDUEL" | "CLUBS" |null
  tournament: IndividualTournament | ClubsTournament | null;
  playersToAdd: {count: number, players: Player[]} | null;
  teamsToAdd:{count: number, teams: Club[]}| null; 
  error: any;
  zone : 'N' | 'R' | 'C' | 'CL' | null
   zoneData: Region | number | null
}

export const initialTournamentState: TournamentState = {
  individualTournaments: [],
  clubsTournaments: [],
  filter: {},
  loading: false,
  selectedTournament: null,
  error: null,
 
};

export const initialRequestTournamentState: RequestTournamentState = {
  tournamentType: null,
  tournament: null  ,
  playersToAdd: null,
  teamsToAdd: null,
  error: null,
  zone: null,
  zoneData: null
}

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



export const requestTournamentReducer = createReducer(
  initialRequestTournamentState,

  on(setRequestTournamentType, (state, { tournamentType }) => ({
    ...state,
    tournamentType
  })),

  on(setRequestTournament, (state, { tournament }) => ({
    ...state,
    tournament
  })),

  on(addPlayersToRequestTournament, (state, { count, players }) => ({
    ...state,
    playersToAdd: { count, players }
  })),

  on(addTeamsToRequestTournament, (state, { count, teams }) => ({
    ...state,
    teamsToAdd: { count, teams }
  })),

  on(setRequestTournamentZone, (state, {  zone }) => ({
    ...state,
     zone
  })),
  on(setRequestTournamentZoneData, (state, { zoneData }) => ({
    ...state,
     zoneData
  })),

  on(setRequestTournamentError, (state, { error }) => ({
    ...state,
    error
  })),

  on(resetRequestTournament, () => initialRequestTournamentState)
);
