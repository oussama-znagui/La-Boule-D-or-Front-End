import { Level } from "../enums/level";
import { Status } from "../enums/status";
import { TounamentMode } from "../enums/tounament-mode";
import { TournamentFormat } from "../enums/tournament-format";
import { TournamentType } from "../enums/tournament-type";
import { Club } from "./club";
import { Player } from "./player";
import { Stage } from "./stage";

export interface Tournament {
    id: number;
    title: string;
    type: TournamentType;
    numberOfPlayers: number;
    startDate: Date ;
    endDate: Date ;
    rules: string ;
    prize: string;
    status: Status;
    mode: TounamentMode ;
    format: TournamentFormat;
    level: Level;

    hostingClub: Club;


    stages: Stage[];
    players: Player[];

    

}
