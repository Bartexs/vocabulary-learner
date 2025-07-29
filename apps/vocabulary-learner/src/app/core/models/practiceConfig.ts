import { ExerciseType } from "./exercise";


export interface PracticeConfig {
    exerciseList: ExerciseType[],
    lessonsID: number[],
}