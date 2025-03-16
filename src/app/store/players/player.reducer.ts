import { createReducer, on } from "@ngrx/store";
import { Player } from "../../models/player";
import { loadPlayers, loadPlayersFailure, loadPlayersSuccess } from "./player.actions";


export interface PlayerState{
    players: Player[];
    loading: boolean;
    error: any;
}

export const initialPlayerState: PlayerState = {
    players: [],
    loading: false,
  error: null

}


export const playerReducer = createReducer(
    initialPlayerState,
    on(loadPlayers, state => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(loadPlayersSuccess, (state, {players} )=> ({
        ...state,
        players: players,
        loading: false,
    })),

    on(loadPlayersFailure, (state, {error}) => ({
        ...state,
        error,
        loading: false
    }))
)