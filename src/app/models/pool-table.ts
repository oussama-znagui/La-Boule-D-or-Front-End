import { Club } from "./club";

export interface PoolTable {
    id: number;
    lastMaintenance: Date;
    isAvailable: boolean;
    availableForTournaments: boolean;
    condition: string;
    brand: string;
    club: Club;
}
