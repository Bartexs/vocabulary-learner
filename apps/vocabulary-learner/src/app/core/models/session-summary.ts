import { ExerciseSummary } from "./exercise-Summary";
import { SessionType } from "./session-type";

export interface SessionSummary {
    id: number;
    type: SessionType;
    exercisesSummary: ExerciseSummary[];
}