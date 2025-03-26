import { Match } from "./match";
import { PoolTable } from "./pool-table";
import { Stage } from "./stage";

export interface Challenge {
    id: number;
    raceTo: number;
    dateTime: Date;
    // poolTable: PoolTable
    stage: Stage;
    matches: Match[];
    

}
