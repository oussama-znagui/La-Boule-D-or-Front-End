import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { PlayerService } from "../../services/player.service";
import { loadPlayers, loadPlayersFailure, loadPlayersSuccess } from "./player.actions";
import { catchError, map, mergeMap, of } from "rxjs";


@Injectable()
export class PlayerEffects{
    loadAllPlayers
    constructor(
        private actions: Actions,
        private playerService: PlayerService
    ){

        this.loadAllPlayers = createEffect(() =>
            this.actions.pipe(
                ofType(loadPlayers),
                mergeMap(() => 
                this.playerService.getAllPlayers().pipe(
                    map((players) => loadPlayersSuccess({players})),
                    catchError((error) => of (loadPlayersFailure({error : error.message})))
                )
            )
            ))

    }

   

}