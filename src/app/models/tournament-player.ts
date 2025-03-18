import { Player } from "./player";
import { Tournament } from "./tournament";

export interface TournamentPlayer {
    player: Player;
    tournament: Tournament;
    note?: string

}
