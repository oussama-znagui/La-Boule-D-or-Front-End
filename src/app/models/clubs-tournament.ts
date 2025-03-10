import { Club } from "./club";
import { Tournament } from "./tournament";

export interface ClubsTournament extends Tournament {
    numberOfTeams: number;
    clubs: Club[];
}

