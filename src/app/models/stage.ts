import { StageLevel } from "../enums/stage-level";
import { StageType } from "../enums/stage-type";
import { Status } from "../enums/status";
import { Challenge } from "./challenge";
import { Tournament } from "./tournament";

export interface Stage {
    id: number;
    roundNumber: number;
    startDate:Date;
    endDate: Date;
    status: Status
    type: StageType
    level: StageLevel;
    tournament: Tournament;
    challenges: Challenge[]

}
