import { Club } from "./club";

export interface Table {
    id: number;
    lastMaintenance: Date
    isAvailable: boolean;
    availableForTournaments: boolean;
    condition: string;
    brand: string;
    club: Club;
}
