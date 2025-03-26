import { Club } from "./club";
import { ClubsTournament } from "./clubs-tournament";
import { Tournament } from "./tournament";

export interface TournamentClub {
    club: Club;
    tournament: ClubsTournament;
    clubNotes?: string
}
