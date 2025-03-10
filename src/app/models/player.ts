import { GameType } from "../enums/game-type";
import { Level } from "../enums/level";
import { Club } from "./club";
import { User } from "./user";

export interface Player extends User {
    gameType: GameType;
    level: Level;

    club?: Club;


}
