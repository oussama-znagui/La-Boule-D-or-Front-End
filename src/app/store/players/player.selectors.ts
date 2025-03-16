import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlayerState } from "./player.reducer";



export const selectPlayerState = createFeatureSelector<PlayerState>('player')

export const selectAllPlayers = createSelector(
    selectPlayerState,
    state => state.players
)