import { createAction, props } from "@ngrx/store";
import { Tournament } from "../../models/tournament";


export const loadTournaments = createAction("[Tournament] Load Tournaments");
export const loadTournamentsSucces = createAction(
    "Tournament] Load Tournaments Succes",
    props<{tournaments: Tournament[]}>()
)
export const loadTournamentsFailure  = createAction(
    "Tournament] Load Tournaments Failure",
    props<{error: string}>()
)